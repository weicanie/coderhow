const fileService = require('../service/file.service');
const multer = require('@koa/multer'); //不是multer!!!!!
const fs = require('fs');
const { PORT, HOST } = require('../config/server');
const uploader = multer({
	dest: './uploads/avatar'
}).single('avatar');
const uploader2 = multer({
	dest: './uploads/article-image'
}).array('article_image');

class FileMiddleware {
	uploadAvatar = uploader;
	uploadImages = uploader2;
	async getAvatar(ctx) {
		const userId = ctx.params.userId;
		const fileInfo = await fileService.getAvatarFileInfo(userId);
		const { filename, mimeType } = fileInfo ?? {};
		const readStream = fs.createReadStream(`./uploads/avatar/${filename}`);
		ctx.type = mimeType;
		ctx.body = readStream;
	}
	async storeAvatar(ctx) {
		const fileInfo = ctx.request.file;
		const { filename, mimetype, size } = fileInfo;
		const { userId } = ctx.user;
		const avatar_url = `${HOST}:${PORT}/avatar/${userId}`;
		return await fileService.storeAvatar(filename, mimetype, size, userId, avatar_url);
	}
	async storeImages(ctx) {
		const files = ctx.request.files;
		const { userId } = ctx.user;
		return await fileService.storeImages(files, userId);
	}
	async getImage(ctx, next) {
		const { filename, mimeType } = ctx.params;
		// console.log(filename,mimeType)
		const readStream = fs.createReadStream(`./uploads/article-image/${filename}`);
		ctx.type = mimeType;
		ctx.body = readStream;
	}
}
const fileMiddleware = new FileMiddleware();

module.exports = fileMiddleware;
