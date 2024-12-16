const jwt = require('jsonwebtoken');
const { publicKey } = require('../utils/key');
const authService = require('../service/auth.service');

class AuthMiddleware {
	async loginVerify(ctx, next) {
		// console.log('loginVerify', ctx.request);
		const token = ctx.request.header.authorization?.replace('Bearer ', '');
		if (token === undefined) {
			ctx.app.emit('error', new Error('-1006'), ctx);
		}

		try {
			const res = jwt.verify(token, publicKey);
			const { id, username } = res;
			// console.log('AuthMiddleware', id, username)
			ctx.user = { userId: id, username };
		} catch (err) {
			ctx.app.emit('error', new Error('-1005'), ctx);
			return;
		}
		return await next();
	}

	async permissionVerify(ctx, next) {
		const path = ctx.request.path;
		let resource = path.match(/(?<=\/)[a-z]+(?=\/)/g)[0];
		console.log('资源名：', resource);
		if (resource === 'tag') resource = 'article';
		const { userId } = ctx.user;
		const resourceId = ctx.params[resource + 'Id'];
		return await authService.permissionVerify(resource, resourceId, userId, next);
	}
}

const authMiddleware = new AuthMiddleware();

module.exports = authMiddleware;
