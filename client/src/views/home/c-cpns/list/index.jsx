import React, { memo, useState } from 'react';
import ListWrapper from './style';
import Article from './c-cpns/article';
import useFetchData from '@/hooks/useFetchData';
import getArticleList from '@/services/modules/getArticleList';

const List = memo(() => {
	const [articleList, setArticleList] = useState(null);
	useFetchData(setArticleList, {
		fetcher: getArticleList,
		offset: 0
	});
	// console.log('List', articleList)
	return (
		<ListWrapper>
			{articleList &&
				articleList.map((item, index) => {
					return <Article article={item} imageList={item.imagelist} key={item.create_at} />;
				})}
		</ListWrapper>
	);
});

export default List;
