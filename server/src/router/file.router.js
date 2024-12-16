const Router = require('@koa/router');
const fileMiddleware = require('../middleware/file.middleware');
const authMiddleware = require('../middleware/auth.middleware');
const fileController = require('../controller/file.controller');

const { loginVerify } = authMiddleware;
const { uploadAvatar, storeAvatar, getAvatar, uploadImages, storeImages, getImage } =
	fileMiddleware;

const fileRouter = new Router({ prefix: '' });

fileRouter.post(
	'/upload/avatar', //上传头像
	fileController.uploadAvatar,
	loginVerify,
	uploadAvatar,
	storeAvatar //相关信息存储到数据库
);

fileRouter.get(
	'/avatar/:userId', //获取用户头像，取最新
	fileController.getAvatar,
	getAvatar
);

fileRouter.post(
	'/upload/article-image', //上传文章配图
	fileController.uploadImages,
	loginVerify,
	uploadImages,
	storeImages //相关信息存储到数据库
);

fileRouter.get(
	'/file/image/:filename/:mimeType', //获取文章配图
	fileController.getImage,
	getImage
);

module.exports = fileRouter;
