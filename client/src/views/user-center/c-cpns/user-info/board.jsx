import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';

const demoTheme = createTheme({
	cssVariables: {
		colorSchemeSelector: 'data-toolpad-color-scheme'
	},
	colorSchemes: { light: true, dark: false }, //切换亮暗
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 600,
			lg: 1200,
			xl: 1536
		}
	}
});

function DashboardLayoutNavigationLinks(props) {
	const router = useDemoRouter('/home');

	return (
		// preview-start
		<AppProvider
			navigation={[
				{
					segment: 'home',
					title: '草稿箱',
					icon: <DescriptionIcon />
				},
				{
					segment: 'about',
					title: '收藏夹',
					icon: <DescriptionIcon />
				}
			]}
			router={router}
			theme={demoTheme}
		>
			<DashboardLayout></DashboardLayout>
		</AppProvider>
		// preview-end
	);
}

export default DashboardLayoutNavigationLinks;
