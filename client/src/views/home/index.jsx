import React, { memo, useEffect } from 'react';
import Cover from './c-cpns/cover';
import HomeWrapper from './style';
import { useDispatch } from 'react-redux';
import { setPageName } from '@/store/modules/header';
import Header from '@/components/app-header';
import List from './c-cpns/list';

const Home = memo(() => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setPageName('home'));
	}, [dispatch]);

	useEffect(() => {
		document.body.style.backgroundColor = ' rgb(242,243,245)';
		return () => (document.body.style.backgroundColor = '');
	}, []);
	return (
		<HomeWrapper>
			<Header flashControl={true} isFixed={true} />
			<Cover />
			<List />
		</HomeWrapper>
	);
});

export default Home;
