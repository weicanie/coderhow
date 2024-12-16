const connection = require('../app/database/connection');

class UserSevice {
	async searchUsername(username) {
		const statement = 'SELECT * FROM `user` WHERE username = ?';
		const [values] = await connection.execute(statement, [username]);
		return values;
	}
	async addUser(username, password) {
		const statement = 'INSERT INTO `user` (username, `password`) VALUES (?,?)';
		const res = await connection.execute(statement, [username, password]);
		return res;
	}
	async hasUsername(username) {
		return await this.searchUsername(username);
	}
	async uploadSign(userId, sign) {
		const statement = 'UPDATE `user` SET sign = ? WHERE id = ?';
		const res = await connection.execute(statement, [sign, userId]);
		return res;
	}
	async getUserInfo(userId) {
		const statement = 'SELECT id, username, avatar_url, sign FROM `user` WHERE id =?';
		const [res] = await connection.execute(statement, [userId]);
		return res[0];
	}
}

const userService = new UserSevice();
module.exports = userService;
