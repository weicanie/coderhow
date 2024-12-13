//怎么实现滑动加载？
//继续使用点击跳转全部！？

import { instance2 } from '@/services/config';
import imageURLConcat from '@/utils/imageURLConcat';

export default async function getArticleList(offset = 0, size = 20) {
	const data = await instance2.get(`/article/list?offset=${offset}&size=${size}`);
	data.forEach(article => {
		// * 无配图的情况处理
		if (article.imagelist[0].id === null) return;
		article.imagelist = article.imagelist.map(item => imageURLConcat(item.filename, item.mimetype));
	});
	// console.log('getArticleList', data)
	return data;
}
