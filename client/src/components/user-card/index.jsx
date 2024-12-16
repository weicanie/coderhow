import React, { memo, useState } from 'react';
import UserCardWrapper from './style';
import { DisconnectOutlined, EditOutlined, FormOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input } from 'antd';
import uploadAvatar from '@/services/modules/user/uploadAvatar';
import removeFromLS from '@/utils/ls_remove';
import storeInLS from '@/utils/ls_store';
import { message } from 'antd';
import uploadSign from '@/services/modules/user/uploadSign';
import useFetchData from '@/hooks/useFetchData';
import getUserOwnInfo from '@/services/modules/user/getUserOwnInfo';
import getFromLS from '@/utils/ls_get';
import useNavigator from '@/hooks/useNavigator';
import { shallowEqual, useSelector } from 'react-redux';
const UserCard = memo(props => {
	const [userInfo, setUserInfo] = useState()
	const { username, avatar_url, sign} = userInfo ? userInfo : {};

	useFetchData(setUserInfo, {
		fetcher:getUserOwnInfo,
	})

	const { pageName } = useSelector(state => {
		return {
			pageName: state.header.pageName
		};
	}, shallowEqual);
	const token = pageName === 'detail' ? null : getFromLS('user')?.token;

	const [isSign, serIsSign] = useState(false)
	const navigator = useNavigator()
	function quit() {
		removeFromLS('user');
		storeInLS('user', { token: undefined });
		navigator('/home');
	}
		const [form] = Form.useForm();
	return (
		<UserCardWrapper>
				<div id="user-card">
				<Avatar src={avatar_url} alt="默认头像" size={100} />
				<span className="username">{username}</span>
				<div className="desc">{sign ? sign : '这个人什么都没有写~'}</div>
				{token && (
					<div className="avatar option">
						<label htmlFor="upload-avatar">
						<FormOutlined />
							更换头像
						</label>
					</div>
				)}
				{token && (
					<div className="sign option"
					onClick={() => {serIsSign(true)}}
					>
						<label>
							<EditOutlined key="edit" />
							修改个签
						</label>
					</div>
				)}
				{isSign&&
					<Form
					form={form}
					name="write"
					onFinish={(value) => {
						uploadSign(value.content)
						message.success('签名已提交审核~')
					}}
					style={{
						width: 800,
						position:'absolute',
						left:180,
						bottom:-30,
					}}
					scrollToFirstError
				>
					<Form.Item
						name="content"
						label=""
						rules={[
							{
								required: true,
								message: '请输入评论内容'
							}
						]}
					>
						<Input.TextArea showCount maxLength={50} rows={1} id="input-comment" />
					</Form.Item>
	
					<Form.Item>
						<Button 
						htmlType="submit" 
						style={{
							position:'relative',
							bottom:7,
							marginRight:27,
						}}
						>
							提交
						</Button>
						<Button 
						htmlType="submit" id="close-comment" 
						style={{
							position:'relative',
							bottom:7,
							
						}}
						onClick={() => {serIsSign(false)}}
						>
							关闭
						</Button>
					</Form.Item>
				</Form>
				}
				{token&&
					<div className="quit option"
					onClick={() => {
						quit();
						message.success('已退出登录~');
					}}
					>
					<label>
						<DisconnectOutlined />
						退出登录
					</label>
					</div>
				}
				{token && (
					<input
						type="file"
						id="upload-avatar"
						style={{ display: 'none' }}
						onChange={async e => {
							await uploadAvatar(e.target.files[0], token);
							// * 主动更新组件，但此时服务往往还没有储存好新头像，没有意义，拿到的还是原来的头像
							// setForce(force+1)
							message.success('头像已提交审核~');
						}}
					/>
				)}
			</div>
		</UserCardWrapper>
	);
});

export default UserCard;
