import React from 'react';
import { DisconnectOutlined } from '@ant-design/icons';
import getFromLS from '@/utils/ls_get';
import DashboardLayoutNavigationLinks from './board';
import removeFromLS from '@/utils/ls_remove';
import storeInLS from '@/utils/ls_store';
import useNavigator from '@/hooks/useNavigator';
import UserCard from '@/components/user-card';
import { message } from 'antd';
const App = () => {
	const user = getFromLS('user');
	const { username, avatar_url ,token} = user??{};
	const navigator = useNavigator();
	function quit() {
		removeFromLS('user');
		storeInLS('user', { token: undefined });
		navigator('/home');
	}
	return (
		<>
			<UserCard username={username} avatar_url={avatar_url} token={token} />
			{/* 退出登录 */}
			{token&&
				<label
					id="quit"
					onClick={() => {
						quit();
						message.success('已退出登录~');
					}}
				>
					<DisconnectOutlined />
					退出登录
				</label>
			}
			<DashboardLayoutNavigationLinks />
		</>
	);
};
export default App;
