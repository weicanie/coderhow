const Router = require('@koa/router');
const tagMiddleware = require('../middleware/tag.middleware');
const tagController = require('../controller/tag.controller');
const authMiddleware = require('../middleware/auth.middleware');

const {
	addTag,
	removeTagFromArticle,
	addTagToArticle,
	checkTagisDuplicated,
	checkAndMapTagList,
	getTagList
} = tagMiddleware;
const { loginVerify, permissionVerify } = authMiddleware;
const tagRouter = new Router({ prefix: '/tag' });

tagRouter.post(
	'/', //创建标签
	tagController.addTag,
	loginVerify,
	checkTagisDuplicated,
	addTag
);
tagRouter.get(
	'/', //获取标签列表
	tagController.getTagList,
	getTagList
);
tagRouter.post(
	'/article/:articleId', //给文章添加标签
	tagController.addTagToArticle,
	loginVerify,
	permissionVerify,
	checkAndMapTagList,
	addTagToArticle
);

tagRouter.delete(
	'/article/:articleId/:tagId', //删除文章的标签
	tagController.removeTagFromArticle,
	loginVerify,
	permissionVerify,
	removeTagFromArticle
);

module.exports = tagRouter;
