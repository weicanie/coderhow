import React, { memo } from 'react';
import SectionItemsWrapper from './style';
import RoomItem from './c-cpns/room-item';

const SectionItems = memo(props => {
	const { roomData, curIndex, names, showCount, isViewMore } = props;
	let { showWidth } = props;
	const length = names && roomData[names[curIndex]].length;
	if (length === 6) {
		showWidth = `33.333%`;
	} else if (length === 8) {
		showWidth = `25%`;
	}
	let items;
	if (curIndex !== undefined) {
		//区分home页面和
		items =
			roomData &&
			roomData[names[curIndex]].map((item, index) => (
				<div key={item.id} className="room-item">
					<RoomItem pictureUrl={item.picture_url} data={item} />
				</div>
			));
	} else {
		items = roomData.map((item, index) =>
			index < showCount ? (
				<div key={item.id} className="room-item">
					<RoomItem pictureUrl={item.picture_url} data={item} />
				</div>
			) : null
		);
	}

	if (isViewMore === true) {
		items = roomData.map((item, index) =>
			index < showCount ? (
				<div key={item.id} className="room-item">
					<RoomItem
						pictureUrls={item.picture_urls}
						data={item}
						indexInDataList={index}
						isViewMore={isViewMore}
					/>
				</div>
			) : null
		);
	}

	return <SectionItemsWrapper width={showWidth}>{items}</SectionItemsWrapper>;
});

export default SectionItems;
