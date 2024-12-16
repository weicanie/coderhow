class UserController {
	async commit(ctx, next) {
		const res = await next();
		/*
    错误处理函数同步执行，这里的
    ctx.body = res 异步执行，在错误处理函数之后。
    会导致发射错误后返回空而不是错误信息。

    ctx.body并不是赋值就响应，而是所有代码执行之后响应，
    在这期间可以修改ctx.body的值。（指针）
    */
		if (res) {
			ctx.body = { code: 0, result: res };
		}
	}
}

const userController = new UserController();

module.exports = userController;
