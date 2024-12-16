const tagService = require('../service/tag.service');

class TagMiddleware {
	async addTag(ctx, next) {
		const { content } = ctx.request.body;
		return await tagService.addTag(content);
	}
	async getTagList(ctx, next) {
		return await tagService.getTagList();
	}

	async checkTagisDuplicated(ctx, next) {
		const { content } = ctx.request.body;
		const isDuplicated = await tagService.checkTagisDuplicated(content);
		if (isDuplicated) {
			ctx.app.emit('error', new Error('-1008'), ctx);
			return;
		}
		return await next();
	}

	async checkAndMapTagList(ctx, next) {
		//1. 查找TagList中有无新标签，有则新建
		//2. 把每个tag映射成content + id的形式
		const { tag } = ctx.request.body;
		// *没有设置标签的情况
		if (tag.length === 0) return;
		const readyTaglist = [];
		for (const tagContent of tag) {
			//标签是否存在
			const isDuplicated = await tagService.checkTagisDuplicated(tagContent);
			if (!isDuplicated) {
				await tagService.addTag(tagContent);
			}
			const [tagFinded] = await tagService.findTag(tagContent);
			readyTaglist.push(tagFinded);
		}
		ctx.readyTaglist = readyTaglist;
		return await next();
	}

	async addTagToArticle(ctx) {
		const readyTaglist = ctx.readyTaglist;
		// 在提交文章的流水线中，addArticle放入最新添加的文章的id
		const articleId = ctx.params?.articleId ?? ctx.articleId;
		if (!articleId) return;
		return await tagService.addTagToArticle(articleId, readyTaglist);
	}

	async removeTagFromArticle(ctx) {
		const resourceId = ctx.params.tagId;
		const articleId = ctx.params.articleId;
		return await tagService.removeTagFromArticle(resourceId, articleId);
	}
}
const tagMiddleware = new TagMiddleware();

module.exports = tagMiddleware;
