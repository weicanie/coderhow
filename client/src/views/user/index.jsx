import React, { memo, useEffect, useState } from 'react';
import UserWrapper from './style';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setBgColor, setIsOut, setPageName } from '@/store/modules/header';
import FormLogin from './c-cpns/form-login';
import FormCommit from './c-cpns/form-commit';
import storeInLS from '@/utils/ls_store';
import useNavigator from '@/hooks/useNavigator';
import getFromLS from '@/utils/ls_get';
import Header from '@/components/app-header';

const User = memo(() => {
	const [showCommit, setShowCommit] = useState(false);
	const { user } = useSelector(
		state => ({
			user: state.coderhub.user
		}),
		shallowEqual
	);
	const navigator = useNavigator();
	useEffect(() => {
		if (user?.token) {
			//鸭子类型检测，从服务器获取的user才储存
			storeInLS('user', user);
			navigator('/user-center');
		}
	}, [user]);
	//界面刷新后维持登录状态
	const userInfo = getFromLS('user');
	useEffect(() => {
		if (userInfo?.token) {
			navigator('/user-center');
		}
	}, []);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setPageName('user-center'));
		dispatch(setIsOut(false));
		dispatch(setBgColor('white'));
	}, [dispatch]);
	useEffect(() => {
		document.body.style.backgroundColor = ' rgb(242,243,245)';
		return () => (document.body.style.backgroundColor = '');
	}, []);
	return (
		<UserWrapper>
			<Header flashControl={false} isFixed={false} />
			<div className="place-holder"></div>
			{!showCommit && <FormLogin setShowCommit={setShowCommit} />}
			{showCommit && <FormCommit setShowCommit={setShowCommit} />}
		</UserWrapper>
	);
});

export default User;
