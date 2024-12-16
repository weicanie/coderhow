const connection = require('../app/database/connection');

class TagSevice {
	async addTag(content) {
		const statement = `INSERT INTO tag (content) VALUES (?)`;
		return await connection.execute(statement, [content]);
	}
	async getTagList() {
		const statement = `
		SELECT id,content FROM tag
		LIMIT 0,7
		`;
		const [values] = await connection.execute(statement);
		return values;
	}

	async checkTagisDuplicated(content) {
		const statement = `SELECT * FROM tag WHERE content = ?`;
		const [values] = await connection.execute(statement, [content]);
		// console.log('checkTagisDuplicated', values)
		if (!values[0]?.id) return false;
		return true;
	}

	async findTag(content) {
		const statement = `SELECT id,content FROM tag WHERE content = ?`;
		const [values] = await connection.execute(statement, [content]);
		return values;
	}

	async tagIsOwned(articleId, tagId) {
		//检查文章是否已经有该标签
		const statement = `SELECT * FROM article_tag WHERE article_id = ? AND tag_id=?`; //二元组是否已存在
		const [values] = await connection.execute(statement, [articleId, tagId]);
		if (values.length === 0) return false;
		return true;
	}

	async addTagToArticle(articleId, readyTaglist) {
		const tagIdList = readyTaglist.map(item => item.id);
		const reslist = [];
		for (const tagId of tagIdList) {
			if (await this.tagIsOwned(articleId, tagId)) continue;
			try {
				const statement = `INSERT INTO article_tag (article_id, tag_id) VALUES (?, ?)`;
				const res = await connection.execute(statement, [articleId, tagId]);
				reslist.push(res);
			} catch (error) {
				console.log(error);
				return;
			}
		}
		return reslist;
	}

	async removeTagFromArticle(resourceId, articleId) {
		if (!(await this.tagIsOwned(articleId, resourceId))) return;
		const statement = 'DELETE FROM article_tag WHERE tag_id = ? AND article_id = ?';
		return await connection.execute(statement, [resourceId, articleId]);
	}
}

const tagService = new TagSevice();
module.exports = tagService;
