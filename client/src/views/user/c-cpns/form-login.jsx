import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { coderhubCommitAction } from '@/store/modules/commitAndLogin';

const App = props => {
	const dispatch = useDispatch();
	const onFinish = async values => {
		values.isCommit = false;
		dispatch(coderhubCommitAction(values));
	};
	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};
	const { setShowCommit } = props;
	return (
		<Form
			name="basic"
			labelCol={{
				span: 8
			}}
			wrapperCol={{
				span: 16
			}}
			style={{
				maxWidth: 600
			}}
			initialValues={{
				remember: true
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item
				label="用户名"
				name="username"
				rules={[
					{
						required: true,
						message: 'Please input your username!'
					}
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="密码"
				name="password"
				rules={[
					{
						required: true,
						message: 'Please input your password!'
					}
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item name="remember" valuePropName="checked" label={null}>
				<Checkbox>记住我</Checkbox>
			</Form.Item>

			<Form.Item label={null}>
				<Button type="primary" htmlType="submit">
					登录
				</Button>
				<span
					id="toCommit"
					href="/user"
					onClick={() => {
						setShowCommit(true);
					}}
				>
					还没有账号？去注册-&gt;
				</span>
			</Form.Item>
		</Form>
	);
};
export default App;
