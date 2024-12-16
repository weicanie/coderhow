class TagController {
	async addTag(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}
	async addTagToArticle(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}

	async removeTagFromArticle(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}
	async getTagList(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}

	/*   别人可能也在用，不允许修改
async modifyTag(ctx, next) {
    const res =  await next()
    if (res) {
      ctx.body = res
    }
  } */
}

const tagController = new TagController();

module.exports = tagController;
