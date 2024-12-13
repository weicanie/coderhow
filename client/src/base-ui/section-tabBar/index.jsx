import React, { memo } from 'react';
import SectionFooterWrapper from './style';
import ScrollView from './c-cpns/scroll-view';
//问题：无法获取DOM元素引用传给button来获取offsetLeft
const SectionTabBar = memo(props => {
	const { passCurIndexBack, datalist, curIndex, isViewLongfor } = props;
	return (
		<SectionFooterWrapper>
			{datalist && (
				<ScrollView
					datalist={datalist}
					curIndex={curIndex}
					passCurIndexBack={passCurIndexBack}
					isViewLongfor={isViewLongfor}
				/>
			)}
		</SectionFooterWrapper>
	);
});

export default SectionTabBar;
