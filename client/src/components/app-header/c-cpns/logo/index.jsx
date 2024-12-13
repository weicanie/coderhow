import React, { memo, useEffect, useState } from 'react';
import LogoWrapper from './style';
import { shallowEqual, useSelector } from 'react-redux';

const Logo = memo(() => {
	const [color, setColor] = useState();
	const { bgColor } = useSelector(state => {
		return {
			bgColor: state.header.bgColor
		};
	}, shallowEqual);
	useEffect(() => {
		if (bgColor === 'transparent') {
			setColor('transparent');
		} else {
			setColor('rgb(186,170,188)');
		}
	}, [bgColor]);
	return <LogoWrapper color={color}>𝘾𝙊𝘿𝙀𝙍𝙃𝙊𝙒</LogoWrapper>;
});

export default Logo;
