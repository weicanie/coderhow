const connection = require('../app/database/connection');

class CommentSevice {
	async addComment(content, userId, articleId, commentId, judge, value) {
		console.log('CommentSevice', content, userId, articleId, commentId, judge, value);
		let statement;
		if (commentId) {
			statement = `INSERT INTO comment (content, user_id, article_id, comment_id, judge, value) VALUES (?, ?, ?, ?, ?, ?)`;
			return await connection.execute(statement, [
				content,
				userId,
				articleId,
				commentId,
				judge,
				value
			]);
		} else {
			statement = `INSERT INTO comment (content, user_id, article_id, judge, value) VALUES (?, ?, ?, ?, ?)`;
			return await connection.execute(statement, [content, userId, articleId, judge, value]);
		}
	}

	async removeComment(resourceId) {
		const statement = 'DELETE FROM `comment` WHERE id = ?';
		return await connection.execute(statement, [resourceId]);
	}

	async modifyComment(resourceId, content) {
		const statement = 'UPDATE comment SET content = ? WHERE id = ?';
		return await connection.execute(statement, [content, resourceId]);
	}

	async getCommentCount(articleId) {
		const statement = `SELECT 
        m.id id, m.content content, m.create_at create_at, m.update_at update_at, 
        JSON_OBJECT('user_id',u.id, 'username', u.username) user,
        (SELECT COUNT(*) FROM comment WHERE comment.article_id = m.id) comment_count
      FROM article m LEFT JOIN user u ON m.user_id = u.id
      WHERE m.id = ?`;

		const [value] = await connection.execute(statement, [articleId]);
		return value;
	}
}

const commentService = new CommentSevice();
module.exports = commentService;
