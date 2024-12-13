import React, { memo } from 'react';
import UserCardWrapper from './style';
import { EditOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import uploadAvatar from '@/services/modules/uploadAvatar';
import { message } from 'antd';
const UserCard = memo(props => {
	const { username, avatar_url, token } = props;
	// const [force, setForce] = useState(0)
	// if (!token) message.info('请先登录~')
	return (
		<UserCardWrapper>
				<div id="user-card">
				<Avatar src={avatar_url} alt="默认头像" size={100} />
				<span className="username">{username}</span>
				{token && (
					<div>
						<label id="avatar" htmlFor="upload-avatar">
							<EditOutlined key="edit" />
							更换头像
						</label>
					</div>
				)}
				{token &&<div className="desc">这个人很懒，什么都没写~</div>}
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
