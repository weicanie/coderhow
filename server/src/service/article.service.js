const connection = require('../app/database/connection');

class ArticleSevice {
	async addArticle(title, content, userId, summary) {
		const statement = 'INSERT INTO article (title, content, user_id) VALUES (?, ?, ?)';
		const statement2 =
			'INSERT INTO article (title, content, user_id, ai_summary) VALUES (?, ?, ?, ?)';
		if (summary) {
			return await connection.execute(statement2, [title, content, userId, summary]);
		} else {
			return await connection.execute(statement, [title, content, userId]);
		}
	}
	async removeArticle(resourceId) {
		const statement = 'DELETE FROM `article` WHERE id = ?';
		return await connection.execute(statement, [resourceId]);
	}
	async modifyArticle(resourceId, content) {
		const statement = 'UPDATE article SET content = ? WHERE id = ?';
		return await connection.execute(statement, [content, resourceId]);
	}
	async getArticleList(size = 5, offset = 0) {
		const statement = `
    SELECT 
      m.id id, m.title title, m.content content, m.ai_summary, m.create_at create_at, m.update_at update_at, 
      (
        SELECT JSON_OBJECT('user_id',u.id ,'username', u.username, 'avatar_url',u.avatar_url) 
        FROM user u 
        WHERE u.id = m.user_id
      ) author,
      JSON_ARRAYAGG(
        JSON_OBJECT(
					'id', c.id,
          'content', c.content, 'comment_id', c.comment_id,'judge', c.judge,'value',c.value,
          'user', 
            (
              SELECT JSON_OBJECT('user_id',u.id ,'username', u.username,'avatar_url',u.avatar_url) 
              FROM user u
              WHERE u.id = c.user_id
            )
        )
      ) comment,
      (
        SELECT JSON_ARRAYAGG(
        JSON_OBJECT('id',ai.id, 'filename', ai.filename,'mimetype', ai.mime_type) 
        ) imagelist
        FROM article n 
        LEFT JOIN article_image ai 
        ON n.id = ai.article_id
        GROUP BY n.id
        HAVING n.id = m.id
      ) imagelist,
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', a_t.tag_id, 'content', t.content)) tags
        FROM article_tag a_t 
        LEFT JOIN tag t 
        ON t.id = a_t.tag_id
        WHERE a_t.article_id =  m.id
        GROUP BY a_t.article_id
      ) tag
    FROM article m 
    LEFT JOIN comment c ON m.id = c.article_id
    GROUP BY m.id
		LIMIT ?, ?
    `;
		//offset用的是索引，不是'id'，索引从0开始
		//'id'可以当浮标，用来在即时通信中避免消息插入导致历史消息索引错位
		const res = await connection.execute(statement, [String(offset), String(size)]);
		return res[0]; //values
	}

	async getArticleDetail(articleId) {
		//获取单篇文章及其评论列表、标签列表
		const statement = `
    SELECT 
      m.id id, m.title title, m.content content, m.ai_summary, m.create_at create_at, m.update_at update_at, 
      (
        SELECT JSON_OBJECT('user_id',u.id ,'username', u.username, 'avatar_url',u.avatar_url) 
        FROM user u 
        WHERE u.id = m.user_id
      ) author,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', c.id,
          'comment_content', c.content, 'comment_comment_id', c.comment_id,
					'judge', c.judge,'value',c.value,
          'user', 
            (
              SELECT JSON_OBJECT('user_id',u.id ,'username', u.username,'avatar_url',u.avatar_url) 
              FROM user u
              WHERE u.id = c.user_id
            )
        )
      ) comment,
      (
        SELECT JSON_ARRAYAGG(
        JSON_OBJECT('id',ai.id, 'filename', ai.filename,'mimetype', ai.mime_type) 
        ) imagelist
        FROM article n 
        LEFT JOIN article_image ai 
        ON n.id = ai.article_id
        GROUP BY n.id
        HAVING n.id = m.id
      ) imagelist,
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', a_t.tag_id, 'content', t.content)) tags
        FROM article_tag a_t 
        LEFT JOIN tag t 
        ON t.id = a_t.tag_id
        WHERE a_t.article_id =  m.id
        GROUP BY a_t.article_id
      ) tag
    FROM article m 
    LEFT JOIN comment c ON m.id = c.article_id
    GROUP BY m.id
		HAVING m.id = ?
    `;
		try {
			const res = await connection.execute(statement, [articleId]);
			return res[0][0];
		} catch (error) {
			console.log(error);
		}
	}
}

const articleService = new ArticleSevice();
module.exports = articleService;
