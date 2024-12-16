import React, { memo } from 'react';
import routes from '../router';
import { useRoutes } from 'react-router';
import AppWrapper from './style';
const App = memo(() => {
	return (
		<AppWrapper>
			{useRoutes(routes)}
		</AppWrapper>
	);
});

export default App;
