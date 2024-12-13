import React, { memo } from 'react';
import PictureShowWrapper from './style';
import classNames from 'classnames';

const PictureShow = memo(props => {
	const { isBrowserShow_pass } = props;
	const { pictureURLs } = props;
	const clickHandler = () => {
		isBrowserShow_pass(true);
	};
	// console.log('PictureShow', pictureURLs)
	return (
		<PictureShowWrapper>
			{pictureURLs && (
				<div className="pic-containner">
					{pictureURLs.slice(0, 5).map((item, index) => {
						return (
							<div
								className={classNames({
									'first-pic': index === 0,
									pic: index !== 0
								})}
								key={pictureURLs[index]}
							>
								<img src={pictureURLs[index]} alt="loading~" />
								<div className="cover" onClick={() => clickHandler()}></div>
							</div>
						);
					})}
				</div>
			)}
		</PictureShowWrapper>
	);
});

export default PictureShow;
