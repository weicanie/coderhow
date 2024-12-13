import React, { forwardRef, memo } from 'react';
import BottomrWrapper from './style';

const Bottom = memo(
	forwardRef((props, ref) => {
		const { item } = props;
		return (
			<BottomrWrapper bgImage={item.picture_url}>
				<div className="city-bottom" ref={ref}>
					<div className="city-name">{item.city}</div>
					<div className="city-price">均价{item.price}</div>
				</div>
			</BottomrWrapper>
		);
	})
);

export default Bottom;
