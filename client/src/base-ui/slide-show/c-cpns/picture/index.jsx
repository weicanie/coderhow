import React, { memo, useContext, useState } from 'react';
import PictruesWrapper from './style';
import { useNavigate } from 'react-router';
import Wei_useMemo from '@/utils/wei_useMemo';
import { articleContext } from '@/views/home/c-cpns/list/c-cpns/article';
const weiMemo = new Wei_useMemo();
const Pictrues = memo(props => {
	const { pictureData, curIndex, totalCount, isLeftClick, isRightClick } = props;
	const picWidth = 212;
	const [move, setMove] = useState(0);
	const navigate = useNavigate();
	const { articleId } = useContext(articleContext);
	weiMemo.wei_useMemo(() => {
		if (isLeftClick) {
			if (move === 0) {
				setMove(-picWidth * (totalCount - 1));
			} else {
				setMove(move + picWidth);
			}
		}
		if (isRightClick) {
			if (-move === picWidth * (totalCount - 1)) {
				setMove(0);
			} else {
				setMove(move - picWidth);
			}
		}
	}, curIndex);

	return (
		<PictruesWrapper move={move}>
			{
				<div className="pic-containner">
					{pictureData.map((item, index) => {
						return (
							<div className="pic" key={pictureData[index]}>
								<img
									src={pictureData[index]}
									alt="loading~"
									onClick={() => navigate(`/detail/${articleId}`)}
								/>
							</div>
						);
					})}
				</div>
			}
		</PictruesWrapper>
	);
});

export default Pictrues;
