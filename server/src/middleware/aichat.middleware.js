const client = require('../utils/gpt-client');
const connection = require('../app/database/connection');
class AIChatMiddleware {
	async getAnswer(ctx) {
		// 向chatgpt提问、获取答案
		const question = ctx.request.body.question;
		const messages = ctx.request.body.messages;
		return await getAnswerFromAI(question, messages, ctx);
	}

	async getSummary(ctx, next) {
		// 向chatgpt提问、获取文章总结
		const title = ctx.request.body.title;
		const content = ctx.request.body.content;
		ctx.summary = await getSummaryFromAI(title, content);
		return await next();
	}

	async storeConversation(ctx, next) {
		const { userId } = ctx.user;
		const { key, label } = ctx.request.body;
		let content = ctx.request.body.content;
		const statement1 = `SELECT * FROM ai_conversation WHERE keyname = ? AND user_id =?`;
		const statement2 = `INSERT INTO ai_conversation (keyname, label, content, user_id) VALUE(?, ?, ?, ?)`;
		const statement3 = `UPDATE ai_conversation SET content = ? WHERE keyname = ?`;
		const [res1] = await connection.execute(statement1, [key, userId]);
		// *空对话但是初始化会话
		// console.log('content', content)
		if (!res1[0]?.content && content.length === 0) {
			const res = await connection.execute(statement2, [
				key,
				label,
				JSON.stringify(content),
				userId
			]);
			ctx.body = res;
		}

		if (content.length === 0) {
			ctx.body = '空对话,已忽略';
			return;
		}
		// console.log('storeConversation', key, label, content, userId)

		//判断会话数据是否已存在
		// console.log(res1)
		if (res1[0]?.content) {
			// content = res1[0].content.concat(content);
			// console.log('storeConversation', content)
			const res2 = await connection.execute(statement3, [JSON.stringify(content), key]);
			ctx.body = res2;
		} else {
			const res3 = await connection.execute(statement2, [
				key,
				label,
				JSON.stringify(content),
				userId
			]);
			ctx.body = res3;
		}
		// ! key是Mysql保留字
	}

	async getConversationList(ctx, next) {
		const { userId } = ctx.user;
		const statement = `
		SELECT * FROM ai_conversation  WHERE user_id = ?
		`;
		const [res] = await connection.execute(statement, [userId]);
		// res.forEach(item => {
		// 	item.content = JSON.parse(item.content)
		// })
		ctx.body = res;
	}
}
//FIXME没有防止爆token
async function getSummaryFromAI(title, content) {
	console.log('getSummaryFromAI', title, content);
	try {
		// 构建问题的prompt
		const prompt = `
		给这篇文章写一下总结,要求分点、简明扼要。
		标题：${title}
		内容：${content}
		`;
		// 调用OpenAI的提问接口
		const response = await client.chat.completions.create({
			model: 'gpt-3.5-turbo',
			// !要求特定对象数组
			messages: [{ role: 'user', content: prompt }], //提问的角色和内容
			max_tokens: 2000, // 答案长短
			n: 1 // 答案个数
		});
		// 获取答案
		// console.log(response.choices[0].message);
		return response.choices[0].message.content;
	} catch (error) {
		console.error('getAnswer error :', error);
		return null;
	}
}

async function getAnswerFromAI(question, messages, ctx) {
	// *限制messages长度, 目前是字符串总长不能超过2500
	messages = sliceMessages(messages);
	// * 带上下文
	const totalMessages = messages.map((message, index) =>
		index % 2 === 0 ? { role: 'user', content: message } : { role: 'assistant', content: message }
	);
	try {
		// 构建问题的prompt
		const prompt = `${question}`;
		totalMessages.push({ role: 'user', content: prompt });
		// 调用OpenAI的提问接口
		const response = await client.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: totalMessages, //提问的角色和内容
			max_tokens: 2000, // 答案长短
			n: 1 // 答案个数
		});
		// 获取答案
		// console.log(response.choices[0].message);
		ctx.body = response.choices[0].message.content;
	} catch (error) {
		console.error('getAnswer error :', error);
		throw error;
	}
}

function sliceMessages(messages) {
	if (messages.length <= 2) return messages;
	let topIndex;
	let strLenth;
	for (let i = messages.length - 1; i >= 0; i -= 2) {
		strLenth += messages[i].length + messages[i - 1].length;
		if (strLenth > 2500) {
			topIndex = i + 2;
			break;
		}
	}
	messages = messages.slice(topIndex);
	// console.log('sliceMessages', messages)
	console.log('sliceMessages 超出指定长度,上下文已经进行截取,截取后的上下文:', messages);
	return messages;
}

const aichatMiddleware = new AIChatMiddleware();
module.exports = aichatMiddleware;
