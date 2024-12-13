import React, { memo } from 'react';
import CoverWrapper from './style';
import { useDispatch } from 'react-redux';
import { setBgColor, setIsOut } from '@/store/modules/header';
const coverImage = require('assets/img/cover_02.jpg');

const Cover = memo(() => {
	const dispatch = useDispatch();
	const clickHandler = () => {
		dispatch(setIsOut(false));
		dispatch(setBgColor('white'));
	};
	return (
		<CoverWrapper>
			<img src={coverImage} alt="" onClick={clickHandler} />
		</CoverWrapper>
	);
});

export default Cover;
