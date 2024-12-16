import React from 'react';
import getFromLS from '@/utils/ls_get';
import DashboardLayoutNavigationLinks from './board';
import UserCard from '@/components/user-card';
const App = () => {
	const user = getFromLS('user');
	const { username, avatar_url ,token} = user??{};

	return (
		<>
			<UserCard username={username} avatar_url={avatar_url} token={token} />

			{/* <DashboardLayoutNavigationLinks /> */}
		</>
	);
};
export default App;
