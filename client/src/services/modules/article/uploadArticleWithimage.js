import { instance2 } from '@/services/config';
import { formdata_wei } from '@/views/user-center/c-cpns/write/write';
async function uploadArticle(article, token) {
	//上传文章：标题、内容、一或多张配图
	console.log('uploadArticle', article)
	try {
		await instance2.post('/article', article, {
			headers: {
				Authorization: token
			}
		}); //默认json，且对象自动转json
		console.log('formdata_wei', formdata_wei.formdata)
		const fileFormdata = formdata_wei.formdata;
		await instance2.post('/upload/article-image', fileFormdata, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: token
			}
		});
	} catch (error) {
		console.log('uploadArticle failed', error);
	}
}
export default uploadArticle;
