import React, { memo, useState } from 'react';
import SlideShowWrapper from './style';
import Indicator from './c-cpns/indicator';
import Pictrues from './c-cpns/picture';
import IconArrowLeft from '@/assets/svg/icon-arrow-left';
import IconArrowRight from '@/assets/svg/icon-arrow-right';

const SlideShow = memo(props => {
	const { pictureUrls } = props;
	const totalCount = pictureUrls.length;
	const pictureData = pictureUrls;
	//图片滚动部分
	const [isLeftClick, setIsLeftClick] = useState(false);
	const [isRightClick, setIsRightClick] = useState(false);

	const [curIndex, setCurIndex] = useState(0);
	const [isTranslateRight, setIsTranslateRight] = useState(false);
	const [isTranslateLeft, setIsTranslateLeft] = useState(false);
	const [move, setMove] = useState(0);
	const step = 13;

	const isTranslateRight_pass = isTranslateRight => {
		setIsTranslateRight(isTranslateRight);
	};
	const isTranslateLeft_pass = isTranslateLeft => {
		setIsTranslateLeft(isTranslateLeft);
	};

	function leftClickHandler() {
		if (curIndex === 0) {
			setMove(0 - step * (totalCount - 7));
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

	return (
		<SlideShowWrapper>
			<div className="left" onClick={() => leftClickHandler()}>
				<IconArrowLeft />
			</div>
			<Pictrues
				curIndex={curIndex}
				pictureData={pictureData}
				totalCount={totalCount}
				isLeftClick={isLeftClick}
				isRightClick={isRightClick}
			/>
			<Indicator
				curIndex={curIndex}
				totalCount={totalCount}
				isTranslateRight_pass={isTranslateRight_pass}
				isTranslateLeft_pass={isTranslateLeft_pass}
				move={move}
				step={step}
			/>
			<div className="right" onClick={() => rightClickHandler()}>
				<IconArrowRight />
			</div>
		</SlideShowWrapper>
	);
});

export default SlideShow;
