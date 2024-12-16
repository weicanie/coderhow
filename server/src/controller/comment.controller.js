class CommentController {
	async addComment(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}

	async removeComment(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}

	async modifyComment(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}

	async getCommentList(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}

	async getCommentCount(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}

	async emotionAnalyse(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}
}

const commentController = new CommentController();

module.exports = commentController;
