const commentService = require('../service/comment.service');
const client = require('../utils/gpt-client');

class CommentMiddleware {
	async addComment(ctx) {
		const { content } = ctx.request.body;
		const { userId } = ctx.user;
		const articleId = ctx.params.id;
		const commentId = ctx.params.commentId;

		const emotionAns = await emotionAnalyseByAI(content);
		const value = +emotionAns.match(/^\d(?=,)/g)[0];
		const judge = +emotionAns.match(/(?<=,)\d$/g)[0];

		return await commentService.addComment(content, userId, articleId, commentId, judge, value);
	}

	async removeComment(ctx) {
		const resourceId = ctx.params.id;
		return await commentService.removeComment(resourceId);
	}

	async modifyComment(ctx) {
		const { content } = ctx.request.body;
		const resourceId = ctx.params.id;
		return await commentService.modifyComment(resourceId, content);
	}

	async getCommentCount(ctx) {
		const articleId = ctx.params.id;
		return await commentService.getCommentCount(articleId);
	}
}
async function emotionAnalyseByAI(comment) {
	try {
		// 构建问题的prompt
		const prompt = `
		评论:${comment}
		记这条评论为c
		1.给出c的情感激烈程度,
			返回数字代表c的情感激烈程度,
			1:平静;
			2:有点激烈;
			3:激烈;
			4:很激烈;
			5:歇斯底里;
		2.再给出c的情感倾向,是正面的还是负面的。
			返回数字,
			1:正面;
			0:负面;
			2:中立;比如如果c只是在提出问题,返回2
		答案只包含c的情感激烈程度数字a和c的情感倾向b,格式是"a,b"
		`;
		// 调用OpenAI的提问接口
		const response = await client.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: prompt }], //提问的角色和内容
			max_tokens: 2000, // 答案长短
			n: 1 // 答案个数
		});
		// 获取答案
		console.log(response.choices[0].message);
		return response.choices[0].message.content;
	} catch (error) {
		console.error('getAnswer error :', error);
		throw error;
	}
}

const commentMiddleware = new CommentMiddleware();

module.exports = commentMiddleware;
