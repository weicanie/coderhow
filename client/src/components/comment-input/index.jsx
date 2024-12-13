import React, { useRef } from 'react';
import CommentInputWrapper from './style';
import { Avatar, Button, Form, Input, message } from 'antd';
import getFromLS from '@/utils/ls_get';
import postComment from '@/services/modules/postComment';
import deepCopy from '@/utils/wei_deepCopy';

const CommentInput = props => {
	const { articleId, commentToId, updateNow, update, clickHandler } = props;
	const { token, avatar_url } = getFromLS('user') ?? {};
	const [form] = Form.useForm();
	const onFinish = async values => {
		await postComment(values, articleId, token, commentToId);
		// *更新组件
		updateNow(update + 1);
		// TODO清空评论框内容
		message.success('评论发表成功~');
	};

	return (
		<CommentInputWrapper>
			{/* <Avatar
				src={avatar_url}
				alt="默认头像"
				size={70}
				style={{
					float: 'left'
				}}
			/> */}
			<Form
				form={form}
				name="write"
				onFinish={onFinish}
				style={{
					width: 800,
					float: 'left'
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
					<Input.TextArea showCount maxLength={500} rows={5} id="input-comment" />
				</Form.Item>

				<Form.Item>
					<Button htmlType="submit" id="add-comment">
						发布
					</Button>
					<Button htmlType="submit" id="close-comment" onClick={clickHandler}>
						关闭
					</Button>
					{/* <label 
          id ='add-image'
          htmlFor = 'file-image'
        >
          +添加配图
        </label> */}
					<input
						type="file"
						id="file-image"
						multiple
						onChange={e => {
							throw new Error('文件处理程序未添加');
						}}
					/>
				</Form.Item>
			</Form>
		</CommentInputWrapper>
	);
};
export default CommentInput;
