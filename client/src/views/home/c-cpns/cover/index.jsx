import React, { memo } from 'react';
import CoverWrapper from './style';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setBgColor, setIsOut } from '@/store/modules/header';
const coverImage = require('assets/img/cover_02.jpg');

const Cover = memo(() => {
	const dispatch = useDispatch();
	const clickHandler = () => {
		dispatch(setIsOut(false));
		dispatch(setBgColor('white'));
	};
	const { bgColor } = useSelector(state => {
		return {
			bgColor: state.header.bgColor
		};
	}, shallowEqual);
	return (
		<CoverWrapper bgColor={bgColor}>
			<img src={coverImage} alt="" onClick={clickHandler} />
		</CoverWrapper>
	);
});

export default Cover;
