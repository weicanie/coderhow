import React, { memo } from 'react';
import IndicatorWrapper from './style';
import classNames from 'classnames';
import Wei_useMemo from '@/utils/wei_useMemo';
const weiMemo = new Wei_useMemo();
// 生成一个和图片数量相同的圆点列表，一起移动。
// 一次只显示7个圆点。
//中间圆点突出显示的本质：光标移动时同时平移

//平移条件：已到中间（左边或者右边有3个或以上圆点）&&当前方向没到底。

//加上间距：左右间距和元素作为一个整体移动（转化归结思想）
//中间元素变大：中间元素加上间距的整体大小不变
const Indicator = memo(props => {
	const { curIndex, totalCount, move, isTranslateRight_pass, isTranslateLeft_pass, step } = props;
	const arr = Array(totalCount).fill(1);
	//控制是否中间圆点突出显示：将是否translate传给父组件
	weiMemo.wei_useMemo(() => {
		//关键————平移条件：已到中间&&当前方向没到底。
		//是否平移是互斥的
		if (curIndex >= 3 && curIndex <= totalCount - 4 && move > -(totalCount - 7) * step) {
			isTranslateRight_pass(true);
		} else {
			isTranslateRight_pass(false);
		}
		if (curIndex >= 3 && curIndex <= totalCount - 4 && move < 0) {
			isTranslateLeft_pass(true);
		} else {
			isTranslateLeft_pass(false);
		}
	}, curIndex);
	return (
		<IndicatorWrapper move={move}>
			<div className="list_container">
				{arr.map((item, index) => {
					return (
						<div
							key={index}
							className={classNames('point', {
								curIndex: index === curIndex
							})}
						></div>
					);
				})}
			</div>
		</IndicatorWrapper>
	);
});

export default Indicator;
