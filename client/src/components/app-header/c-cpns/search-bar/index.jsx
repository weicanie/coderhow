import React, { memo, useEffect, useRef } from 'react';
import SearchBarrWrapper from './style';
import IconSearchBar from '@/assets/svg/icon-search-bar';
import { CSSTransition } from 'react-transition-group';
import { setBgColor, setIsOut } from '@/store/modules/header';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import debounce from '@/utils/wei_debounce';
import { message } from 'antd';
import useNavigator from '@/hooks/useNavigator';
import getFromLS from '@/utils/ls_get';

const SearchBar = memo(props => {
	const { flashControl } = props;
	const { isOut, bgColor, pageName } = useSelector(state => {
		return {
			isOut: state.header.isOut,
			bgColor: state.header.bgColor,
			pageName: state.header.pageName
		};
	}, shallowEqual);
	const dispatch = useDispatch();
	//一、滑动窗口触发动画的实现逻辑
	//让事件处理程序不重建
	const handlerRef = useRef();
	handlerRef.current = debounce(
		//事件处理程序：窗口滑动离顶部不足5px时，触发动画
		() => {
			if (flashControl === false) return;
			if (window.scrollY < 5) {
				if (pageName === 'home') {
					dispatch(setIsOut(true));
					dispatch(setBgColor('transparent'));
				} 
			}
			if (window.scrollY >= 5) {
				dispatch(setIsOut(false));
				dispatch(setBgColor('white'));
			}
		},
		50
	);
	//注册事件处理程序到window
	const windowScrollHandler = handlerRef.current;
	useEffect(() => {
		window.addEventListener('scroll', windowScrollHandler);
		return () => {
			window.removeEventListener('scroll', windowScrollHandler);
		};
		//pageName改变时，调用cleaner取消上一个事件处理程序，注册这次的事件处理程序
	}, [pageName, windowScrollHandler]);

	//二、首次挂载也执行动画
	useEffect(() => {
		if (flashControl === false) return;
		if (window.scrollY === 0) {
			dispatch(setIsOut(true));
			dispatch(setBgColor('transparent'));
		}
	});

	//三、点击触发动画的实现逻辑
	//home页面，点击触发动画；非home页面时，点击不触发动画
	const clickHandler = payload => {
		console.log('clickHandler')
		if (flashControl === false) navigator('/');
		if (pageName === 'home') {
			dispatch(setIsOut(payload));
		}
	};
	const toWrite = () => {
		if (getFromLS('user')?.token) {
			navigator('/user-center')
		} else {
			navigator('/user')
		}
	}
	const toRead = () => {
		window.scrollTo(0, 600)
	}
	const navigator = useNavigator()
	const toAI = () => {
		navigator('/aichat')
	}

	return (
		<SearchBarrWrapper isOut={isOut} bgColor={bgColor}>
			<div className="cover"></div>
			{isOut && (
				<div className="search-bar-out">
					<div className="text0">亻尔</div>
					<div className="text0">女子</div>
				</div>
			)}
			<CSSTransition
				in={isOut}
				onClick={() => clickHandler(true)}
				classNames="search"
				timeout={1000}
			>
				<div className="search-bar">
					{isOut && <>
						<div className="text theme"onClick={toRead}>𝙍𝙀𝘼𝘿</div>
						<div className="text input" onClick={toWrite}>𝙒𝙍𝙄𝙏𝙀</div>
						<div className="text label" onClick={toAI}>𝘼𝙄</div>
						</>}
					{!isOut && <>
						<div className="text">Coding now</div>
						<div className="icon">
							<IconSearchBar />
						</div>
						</>}
				</div>
			</CSSTransition>
		</SearchBarrWrapper>
	);
});

export default SearchBar;
