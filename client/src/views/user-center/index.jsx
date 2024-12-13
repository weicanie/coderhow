import React, { memo, useEffect } from 'react';
import SegmentControl from './c-cpns/segment-control';
import { useDispatch } from 'react-redux';
import { setBgColor, setIsOut, setPageName } from '@/store/modules/header';
import UserWrapper from './style';
import Header from '@/components/app-header';
const Index = memo(() => {
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
			<SegmentControl />
		</UserWrapper>
	);
});

export default Index;
