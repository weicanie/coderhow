class ArticleController {
	async addArticle(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}

	async removeArticle(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}

	async modifyArticle(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}

	async getArticleList(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}

	async getArticleDetail(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}
}

const articleController = new ArticleController();

module.exports = articleController;
