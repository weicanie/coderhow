import React, { memo } from 'react';
import IndicatorWrapper from './style';
import classNames from 'classnames';

const IndicatorV2 = memo(props => {
	const { curIndex, totalCount, move, isTranslateRight_pass, isTranslateLeft_pass, step } = props;
	const { pictureData, slideCount } = props;
	//控制是否中间圆点突出显示：将是否translate传给父组件

	//关键————平移条件：已到中间&&当前方向没到底。
	//是否平移是互斥的
	const bound = Math.floor(slideCount / 2);
	const isMiddle = curIndex >= bound && curIndex <= totalCount - bound - 1;
	const canScroll = move > -(totalCount - slideCount) * step;
	if (isMiddle && canScroll) {
		isTranslateRight_pass(true);
	} else {
		isTranslateRight_pass(false);
	}
	if (isMiddle && move < 0) {
		isTranslateLeft_pass(true);
	} else {
		isTranslateLeft_pass(false);
	}
	return (
		<IndicatorWrapper move={move}>
			<div className="list_container">
				{pictureData.map((item, index) => {
					return (
						<div
							key={index}
							className={classNames('point', {
								curIndex: index === curIndex
							})}
						>
							<img src={pictureData[index]} alt="" />
							<div className="cover"></div>
						</div>
					);
				})}
			</div>
		</IndicatorWrapper>
	);
});

export default IndicatorV2;
