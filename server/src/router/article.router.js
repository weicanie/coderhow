const Router = require('@koa/router');
const articleMiddleware = require('../middleware/article.middleware');
const articleController = require('../controller/article.controller');
const authMiddleware = require('../middleware/auth.middleware');
const tagMiddleware = require('../middleware/tag.middleware');
const aichatMiddleware = require('../middleware/aichat.middleware');
const { getSummary } = aichatMiddleware;
const { addArticle, removeArticle, modifyArticle, getArticleList, getArticleDetail } =
	articleMiddleware;
const { loginVerify, permissionVerify } = authMiddleware;
const articleRouter = new Router({ prefix: '/article' });

articleRouter.post(
	'/',
	articleController.addArticle,
	loginVerify,
	getSummary,
	addArticle,
	tagMiddleware.checkAndMapTagList,
	tagMiddleware.addTagToArticle
);
articleRouter.delete(
	'/:id',
	articleController.removeArticle,
	loginVerify,
	permissionVerify,
	removeArticle
);
articleRouter.patch(
	'/:id',
	articleController.modifyArticle,
	loginVerify,
	permissionVerify,
	modifyArticle
);
articleRouter.get(
	'/list', //分页获取文章及其评论列表、标签列表
	articleController.getArticleList,
	getArticleList
);
articleRouter.get(
	'/:articleId', //获取单个文章及其评论列表、标签列表
	articleController.getArticleDetail,
	getArticleDetail
);

module.exports = articleRouter;
