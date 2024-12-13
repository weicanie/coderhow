import React, { useState } from 'react';
import { FormOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Flex, Segmented } from 'antd';
import UserInfo from './user-info/user-info';
import Write from './write';
import MdEditor from '@/base-ui/md-editor';
import useNavigator from '@/hooks/useNavigator';
const App = props => {
	const [item, setItem] = useState('user');
	const navigateTo = useNavigator();
	let show;
	switch (item) {
		case 'user':
			show = <UserInfo />;
			break;
		case 'write':
			show = <Write />;
			break;
		case 'setting':
			show = <UserInfo />;
			break;
		default:
			console.log('invalid item!');
	}
	return (
		<Flex gap="small" align="flex-start" vertical>
			<Segmented
				size="large"
				id="control-box"
				vertical
				options={[
					{
						label: (
							<div
								style={{
									padding: 4
								}}
								onClick={() => setItem('user')}
							>
								<Avatar
									style={{
										backgroundColor: '#68c2d0'
									}}
									icon={<UserOutlined />}
								/>
								<div>账户</div>
							</div>
						),
						value: 'user'
					},
					{
						label: (
							<div
								style={{
									padding: 4
								}}
								onClick={() => setItem('write')}
							>
								<Avatar
									icon={<FormOutlined />}
									style={{
										backgroundColor: '#687fd0'
									}}
								/>
								<div>创作</div>
							</div>
						),
						value: 'write'
					},
					{
						label: (
							<div
								style={{
									padding: 4
								}}
								// onClick={() => setItem('write')}
								onClick={() => navigateTo('/')}
							>
								<Avatar
									icon={<HomeOutlined />}
									style={{
										backgroundColor: '#d7406d'
									}}
								/>
								<div>回到首页</div>
							</div>
						),
						value: 'friend'
					}
				]}
			/>
			<div id="area">{show}</div>
		</Flex>
	);
};
export default App;
