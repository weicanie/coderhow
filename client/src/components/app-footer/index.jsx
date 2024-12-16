import React, { memo } from 'react';
import FooterWrapper from './style';

const Footer = memo(() => {
	return (
		<FooterWrapper>
			<div className="top">
				<div className="airbnb">关于 coderhow</div>
				<div className="find">发现</div>
				<div className="github">github</div>
				<div className="support">支持 coderhow</div>
			</div>
			<div className="buttom">2024 coderhow</div>
		</FooterWrapper>
	);
});

export default Footer;
