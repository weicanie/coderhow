import { instance2 } from '@/services/config';
import imageURLConcat from '@/utils/imageURLConcat';
// *请求单篇文章
export default async function getArticle(articleId) {
	const article = await instance2.get(`/article/${articleId}`);
	// * 无配图的情况处理
	if (article.imagelist[0].id === null) return;
	article.imagelist = article.imagelist.map(item => imageURLConcat(item.filename, item.mimetype));

	return article;
}
