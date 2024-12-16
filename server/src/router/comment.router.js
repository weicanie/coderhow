const Router = require('@koa/router');
const commentMiddleware = require('../middleware/comment.middleware');
const commentController = require('../controller/comment.controller');
const authMiddleware = require('../middleware/auth.middleware');

const { addComment, removeComment, modifyComment, getCommentCount } = commentMiddleware;
const { loginVerify, permissionVerify } = authMiddleware;
const commentRouter = new Router({ prefix: '/comment' });

commentRouter.post(
	'/:id/:commentId', //发布评论的评论
	commentController.addComment,
	loginVerify,
	addComment
);
commentRouter.post(
	'/:id', //发布评论
	commentController.addComment,
	loginVerify,
	addComment
);
commentRouter.delete(
	'/:id',
	commentController.removeComment,
	loginVerify,
	permissionVerify,
	removeComment
);
commentRouter.patch(
	'/:id',
	commentController.modifyComment,
	loginVerify,
	permissionVerify,
	modifyComment
);

commentRouter.get('/:id', commentController.getCommentCount, getCommentCount);

module.exports = commentRouter;
