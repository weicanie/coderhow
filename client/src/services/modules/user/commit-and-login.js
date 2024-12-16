import { instance2 } from '@/services/config';
//commit
//login
//关于我chrome控制台没打开错误提示研究了一晚上axios和stack overflow这件事，草
async function coderhubCommit(userInfo) {
	console.log(userInfo);
	const { username, password, isCommit } = userInfo;
	const body = {
		username,
		password
	};
	let data;
	if (isCommit) {
		data = await instance2.post('/user/commit', body); //默认是json格式
	} else {
		data = await instance2.post('/user/login', body);
	}
	return data;
}

export default coderhubCommit;
