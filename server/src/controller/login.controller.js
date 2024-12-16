class LoginController {
	async login(ctx, next) {
		const res = await next();
		if (res) {
			ctx.body = res;
		}
	}
}

const loginController = new LoginController();

module.exports = loginController;
