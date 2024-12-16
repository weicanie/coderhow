const connection = require('../app/database/connection');

class FileSevice {
	async storeAvatar(filename, mimetype, size, userId, avatar_url) {
		const statement = `INSERT INTO avatar (filename, mime_type, size, user_id) values(?,?,?,?)`;
		//用户没有头像的情况
		const statement2 = `UPDATE user SET avatar_url = ? WHERE id = ?`;
		await connection.execute(statement2, [avatar_url, userId]);
		return await connection.execute(statement, [filename, mimetype, size, userId]);
	}

	async getAvatarFileInfo(userId) {
		const statement = `SELECT filename,mime_type mimeType FROM avatar WHERE user_id = ?`;
		const [fileInfo] = await connection.execute(statement, [userId]);
		return fileInfo[fileInfo.length - 1]; //取用户最新的头像
	}
	async storeImages(files, userId) {
		//查询article_id
		const statement = 'SELECT id FROM article WHERE user_id = ? ';
		const [articleIds] = await connection.execute(statement, [userId]);
		const articleId = articleIds[articleIds.length - 1].id;
		const statement2 = `INSERT INTO article_image (filename, mime_type, size, article_id) values(?,?,?,?)`;
		// console.log('storeImages', files)
		const reslist = [];
		for (const file of files) {
			const { filename, mimetype, size } = file;
			const res = await connection.execute(statement2, [filename, mimetype, size, articleId]);
			reslist.push(res);
		}
		// console.log('storeImages',reslist)
		return reslist;
	}
}

const fileService = new FileSevice();
module.exports = fileService;
