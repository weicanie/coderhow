import React, { memo } from 'react';
import ToolkitWrapper from './style';

const Toolkit = memo(() => {
	// console.log('Toolkit')
	return (
		<ToolkitWrapper>
			<div className="top">
				<div className="login">注册</div>
				<div className="submit">登录</div>
			</div>
			<div className="buttom">
				<div className="rent">出租房源</div>
				<div className="open">开展体验</div>
				<div className="help">帮助</div>
			</div>
		</ToolkitWrapper>
	);
});

export default Toolkit;
