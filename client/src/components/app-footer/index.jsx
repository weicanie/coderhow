import React, { memo } from 'react';
import FooterWrapper from './style';

const Footer = memo(() => {
	return (
		<FooterWrapper>
			<div className="top">
				<div className="airbnb">爱彼迎</div>
				<div className="find">发现</div>
				<div className="rent">出租</div>
				<div className="support">客服支持</div>
			</div>
			<div className="buttom">2022 Airbnb</div>
		</FooterWrapper>
	);
});

export default Footer;
