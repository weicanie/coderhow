import React, { memo, useState } from 'react';
import SlideShowWrapper from './style';
import IndicatorV2 from './c-cpns/indicator-v2';
import Pictrues from './c-cpns/picture';
import IconArrowLeft from '@/assets/svg/icon-arrow-left';
import IconArrowRight from '@/assets/svg/icon-arrow-right';
import { step } from './c-cpns/indicator-v2/style';
import { CSSTransition } from 'react-transition-group';

const slideCount = 7;
const SlideShowV2 = memo(props => {
	const { pictureUrls, indexInDataList } = props;
	const totalCount = pictureUrls.length;
	const pictureData = pictureUrls;
	const [isIndicatorShow, setIsIndicatorShow] = useState(true);
	//图片滚动部分
	const [isLeftClick, setIsLeftClick] = useState(false);
	const [isRightClick, setIsRightClick] = useState(false);

	const [curIndex, setCurIndex] = useState(0);
	//是否水平滚动（向左/右），比如没到中间就不滚
	const [isTranslateRight, setIsTranslateRight] = useState(false);
	const [isTranslateLeft, setIsTranslateLeft] = useState(false);
	const [move, setMove] = useState(0);

	const isTranslateRight_pass = isTranslateRight => {
		setIsTranslateRight(isTranslateRight);
	};
	const isTranslateLeft_pass = isTranslateLeft => {
		setIsTranslateLeft(isTranslateLeft);
	};

	function leftClickHandler() {
		if (curIndex === 0) {
			setMove(0 - step * (totalCount - slideCount));
		} else {
			if (isTranslateLeft) {
				setMove(move + step);
			}
		}
		setCurIndex((curIndex - 1 + totalCount) % totalCount);
		setIsLeftClick(true);
		setIsRightClick(false);
	}

	function rightClickHandler() {
		if (curIndex === totalCount - 1) {
			setMove(0);
		} else {
			if (isTranslateRight) {
				setMove(move - step);
			}
		}
		setCurIndex((curIndex + 1) % totalCount);
		setIsLeftClick(false);
		setIsRightClick(true);
	}

	// console.log('isIndicatorShow', isIndicatorShow)
	return (
		<SlideShowWrapper>
			<div className="left" onClick={() => leftClickHandler()}>
				<IconArrowLeft />
			</div>
			<Pictrues
				curIndex={curIndex}
				pictureData={pictureData}
				indexInDataList={indexInDataList}
				totalCount={totalCount}
				isLeftClick={isLeftClick}
				isRightClick={isRightClick}
			/>

			{
				<CSSTransition in={isIndicatorShow} classNames="rtg_list" timeout={2000}>
					<div>
						<IndicatorV2
							curIndex={curIndex}
							totalCount={totalCount}
							isTranslateRight_pass={isTranslateRight_pass}
							isTranslateLeft_pass={isTranslateLeft_pass}
							move={move}
							step={step}
							pictureData={pictureData}
							slideCount={slideCount}
						/>
					</div>
				</CSSTransition>
			}

			{isIndicatorShow && (
				<div className="hide-indicator" onClick={() => setIsIndicatorShow(false)}>
					隐藏照片列表
				</div>
			)}
			{!isIndicatorShow && (
				<div className="show-indicator" onClick={() => setIsIndicatorShow(true)}>
					显示照片列表
				</div>
			)}
			<div className="right" onClick={() => rightClickHandler()}>
				<IconArrowRight />
			</div>
		</SlideShowWrapper>
	);
});

export default SlideShowV2;
export { slideCount };
