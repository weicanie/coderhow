const connection = require('../app/database/connection');

class AuthSevice {
	async permissionVerify(resource, resourceId, userId, next) {
		const statement = `SELECT * FROM ${resource} WHERE user_id = ? AND id = ?`; //表名不能用"？"
		const res = await connection.execute(statement, [userId, resourceId]);
		if (res.length === 0) {
			ctx.app.emit('error', new Error('-1007'), ctx);
			return;
		}
		return await next();
	}
}

const authService = new AuthSevice();
module.exports = authService;
