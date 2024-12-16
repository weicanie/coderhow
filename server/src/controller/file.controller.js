class FileController {
	async uploadAvatar(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}

	async uploadImages(ctx, next) {
		//给文章上传配图
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}

	async getAvatar(ctx, next) {
		await next();
	}

	async getImage(ctx, next) {
		await next();
	}
}

const fileController = new FileController();

module.exports = fileController;
