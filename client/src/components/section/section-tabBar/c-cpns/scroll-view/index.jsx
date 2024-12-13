import React, { memo, useEffect, useRef, useState } from 'react';
import ScrollViewWrapper from './style';
import classNames from 'classnames';
import IconArrowLeft from '@/assets/svg/icon-arrow-left';
import IconArrowRight from '@/assets/svg/icon-arrow-right';
import Bottom from '@/components/section-tabBar/c-cpns/city-bottom';
//实现了响应窗口大小。但实际网站是固定宽度
const ScrollView = memo(props => {
	// console.log('ScrollView')
	const [leftShow, setLeftShow] = useState(false);
	const [rightShow, setRightShow] = useState(false);
	//动态获取可见区域的第一个DOM元素
	const [startIndex, setStartIndex] = useState(0);
	//列表水平平移
	const [move, setMove] = useState(0);
	//可见区域宽度
	const [tabBarInnerWidth] = useState(1032);
	const { datalist, curIndex, passCurIndexBack, isViewLongfor } = props;
	//作用：记录向左移动的历史，来用于向右移动和控制右侧按钮显示
	//不能直接定义栈，因为组件重新渲染时重新定义
	const moveStackRef = useRef([0]);
	const moveStack = moveStackRef.current;

	const marginWidth = 20;
	const startRef = useRef();
	const barRef = useRef();
	const barWidth = barRef.current?.scrollWidth;
	//一开始时是否显示右按钮
	useEffect(() => {
		const barWidth = barRef.current?.scrollWidth;
		if (barWidth > tabBarInnerWidth) {
			setRightShow(!rightShow);
		}
	}, []);

	function rightClickHandler() {
		if (!leftShow) {
			setLeftShow(!leftShow);
		}
		//列表向左移动一个元素
		const newMove = move - (startRef.current.offsetWidth + marginWidth);
		console.log('newMove', newMove);
		setMove(newMove);
		moveStack.push(newMove);
		setStartIndex(startIndex + 1);
		//右侧按钮的消失条件：可见区起的宽度 < 可见区宽度
		const sumMove = moveStack[moveStack.length - 1];
		if (barWidth + sumMove <= tabBarInnerWidth + marginWidth) {
			//为了刚好剩一个时不再显示
			setRightShow(!rightShow);
		}
	}

	function leftClickHandler() {
		if (!rightShow) {
			setRightShow(!rightShow);
		}
		//回退
		moveStack.pop();
		setMove(moveStack[moveStack.length - 1]);
		setStartIndex(startIndex - 1);
		//左侧按钮消失条件：回到初始状态
		if (moveStack.length === 1) {
			setLeftShow(!leftShow);
		}
	}

	let items;
	if (isViewLongfor) {
		items = (
			<div className="list-container" ref={barRef}>
				{datalist.map((item, index) => (
					<div key={item.city} className="city-container">
						<div>
							<Bottom ref={index === startIndex ? startRef : null} item={item} />
						</div>
					</div>
				))}
			</div>
		);
	} else {
		items = (
			<div className="list" ref={barRef}>
				{Object.keys(datalist).map((item, index) => (
					<div
						key={item}
						className={classNames('name-container', { active: index === curIndex })}
						onClick={() => passCurIndexBack(index)}
						ref={index === startIndex ? startRef : null}
					>
						<div className="name-item">{item}</div>
					</div>
				))}
			</div>
		);
	}

	return (
		<ScrollViewWrapper move={move} top={isViewLongfor ? 115 : 15}>
			{leftShow && (
				<div className="left" onClick={() => leftClickHandler()}>
					{<IconArrowLeft />}
				</div>
			)}

			{items}

			{rightShow && (
				<div className="right" onClick={() => rightClickHandler()}>
					{<IconArrowRight />}
				</div>
			)}
		</ScrollViewWrapper>
	);
});

export default ScrollView;
