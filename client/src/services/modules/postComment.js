import { instance2 } from '@/services/config';

//发表对某篇文章的评论，或者对某篇文章下的某条评论进行评论
export default async function postComment({ content }, articleId, token, commentID) {
	// console.log('postComment', content, articleId, token, commentID)
	const body = {
		content,
		commentID
	};
	try {
		await instance2.post(`/comment/${articleId}${commentID ? `/${commentID}` : ''}`, body, {
			headers: {
				Authorization: token
			}
		});
	} catch (error) {
		console.log('uploadArticle failed', error);
	}
}
