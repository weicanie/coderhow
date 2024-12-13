import { lazy } from 'react';
import { Navigate } from 'react-router';
const Home = lazy(() => import('@/views/home'));
const Detail = lazy(() => import('@/views/detail'));
const User = lazy(() => import('@/views/user'));
const UserCenter = lazy(() => import('@/views/user-center'));
const AIChat = lazy(() => import('@/views/aichat'));
const routes = [
	{
		path: '/',
		element: <Navigate to="/home" />
	},
	{
		path: '/home',
		element: <Home />
	},
	{
		path: '/detail/:index',
		element: <Detail />
	},
	{
		path: '/user',
		element: <User />
	},
	{
		path: '/user-center',
		element: <UserCenter />
	},
	{
		path: '/aichat',
		element: <AIChat />
	},
];

export default routes;
