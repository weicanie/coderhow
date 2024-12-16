const articleService = require('../service/article.service');

class ArticleMiddleware {
	async addArticle(ctx, next) {
		const { content, title, tag } = ctx.request.body;
		// console.log('addArticle', ctx.request.body)
		const { userId } = ctx.user;
		const summary = ctx.summary;
		const res = await articleService.addArticle(title, content, userId, summary);
		const id = res[0]?.insertId;
		ctx.articleId = id;
		return await next();
	}

	async removeArticle(ctx) {
		const resourceId = ctx.params.id;
		return await articleService.removeArticle(resourceId);
	}

	async modifyArticle(ctx) {
		const { content } = ctx.request.body;
		const resourceId = ctx.params.id;
		return await articleService.modifyArticle(resourceId, content);
	}

	async getArticleList(ctx) {
		const { size, offset } = ctx.request.query;
		return await articleService.getArticleList(size, offset);
	}

	async getArticleDetail(ctx) {
		const { articleId } = ctx.params;
		return await articleService.getArticleDetail(articleId);
	}
}
const articleMiddleware = new ArticleMiddleware();

module.exports = articleMiddleware;
