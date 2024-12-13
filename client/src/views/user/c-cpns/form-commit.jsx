import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { coderhubCommitAction } from '@/store/modules/commitAndLogin';

const formItemLayout = {
	labelCol: {
		xs: {
			span: 24
		},
		sm: {
			span: 8
		}
	},
	wrapperCol: {
		xs: {
			span: 24
		},
		sm: {
			span: 16
		}
	}
};
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0
		},
		sm: {
			span: 16,
			offset: 8
		}
	}
};
const App = props => {
	const { setShowCommit } = props;
	const { code } = useSelector(
		state => ({
			code: state.coderhub?.user?.code
		}),
		shallowEqual
	);
	useEffect(() => {
		if (code === 0) {
			setShowCommit(false);
		}
	}, [code]);
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const onFinish = async values => {
		values.isCommit = true;
		dispatch(coderhubCommitAction(values));
	};
	return (
		<Form
			{...formItemLayout}
			form={form}
			name="register"
			onFinish={onFinish}
			style={{
				maxWidth: 600
			}}
			scrollToFirstError
		>
			<Form.Item
				name="username"
				label="用户名"
				rules={[
					{
						required: true,
						message: 'Please input your E-mail!'
					}
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="password"
				label="密码"
				rules={[
					{
						required: true,
						message: 'Please input your password!'
					}
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>
			<Form.Item
				name="confirm"
				label="确认密码"
				dependencies={['password']}
				hasFeedback
				rules={[
					{
						required: true,
						message: 'Please confirm your password!'
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error('The new password that you entered do not match!'));
						}
					})
				]}
			>
				<Input.Password />
			</Form.Item>
			<Form.Item {...tailFormItemLayout}>
				<Button type="primary" htmlType="submit">
					注册
				</Button>
			</Form.Item>
		</Form>
	);
};
export default App;
