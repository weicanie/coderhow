import React, { memo } from 'react';
import SectionHeaderWrapper from './style';

const SectionHeader = memo(props => {
	const { header } = props;
	let tilte;
	let subtitle;
	if (Array.isArray(header)) {
		tilte = header[0];
		subtitle = header[1];
	} else {
		//more页面
		tilte = `超过${header}处房源`;
		subtitle = '';
	}
	return (
		<SectionHeaderWrapper>
			<div className="title">{tilte}</div>
			<div className="subtitle">{subtitle}</div>
		</SectionHeaderWrapper>
	);
});

export default SectionHeader;
