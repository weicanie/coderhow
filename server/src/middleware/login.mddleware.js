const userService = require('../service/user.service');
const jwt = require('jsonwebtoken');
const passwordEncryption = require('../utils/password-encryption');
const { privateKey } = require('../utils/key');
const { PORT, HOST } = require('../config/server');
class LoginMiddleware {
	async userInfoCheck(ctx, next) {
		const { username, password } = ctx.request.body;
		if (!username || !password) {
			ctx.app.emit('error', new Error('-1001'), ctx);
			return;
		}

		const res = await userService.hasUsername(username);
		if (res.length === 0) {
			ctx.app.emit('error', new Error('-1003'), ctx);
			return;
		}
		ctx.userInfo = res[0];
		return await next();
	}

	async userVerify(ctx, next) {
		const { password } = ctx.request.body;
		const { password: md5pwd } = ctx.userInfo;
		if (md5pwd !== passwordEncryption(password)) {
			ctx.app.emit('error', new Error('-1004'), ctx);
			return;
		}
		return await next();
	}

	async tokenDispatch(ctx) {
		const { username, id } = ctx.userInfo;
		const token = jwt.sign({ id, username }, privateKey, {
			algorithm: 'RS256',
			expiresIn: 24 * 60 * 60 * 7
		});
		const avatar_url = `${HOST}:${PORT}/avatar/${id}`;
		return {
			id,
			username,
			token,
			avatar_url
		};
	}
}

const loginMiddleware = new LoginMiddleware();

module.exports = loginMiddleware;
