const userService = require('../service/user.service');
const passwordEncryption = require('../utils/password-encryption');

class UserMiddleware {
	async userInfoCheck(ctx, next) {
		console.log(ctx.request.body);
		const { username, password } = ctx.request.body;
		if (!username || !password) {
			ctx.app.emit('error', new Error('-1001'), ctx);
			return;
		}

		const res = await userService.searchUsername(username);
		if (res.length !== 0) {
			ctx.app.emit('error', new Error('-1002'), ctx);
			return;
		}
		return await next();
	}

	async passwordEncryption(ctx, next) {
		const { password } = ctx.request.body;
		ctx.request.body.password = passwordEncryption(password);
		return await next();
	}

	async createUser(ctx, next) {
		const { username, password } = ctx.request.body;
		const res = await userService.addUser(username, password);
		return res[0];
	}
	async uploadSign(ctx, next) {
		const { userId } = ctx.user;
		const sign = ctx.request.body.sign;
		ctx.body = await userService.uploadSign(userId, sign);
	}
	async getUserInfo(ctx, next) {
		const userId = ctx.params.userId;
		ctx.body = await userService.getUserInfo(userId);
	}
}
const userMiddleware = new UserMiddleware();

module.exports = userMiddleware;
