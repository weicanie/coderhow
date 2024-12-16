class AIChatController {
	async getAnswer(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}
	async getSummary(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}
	async storeConversation(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}
	async getConversationList(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}
}

const aichatController = new AIChatController();

module.exports = aichatController;
