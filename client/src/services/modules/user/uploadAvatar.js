import { instance2 } from '@/services/config';

async function uploadAvatar(file, token) {
	// console.log(file, token)
	const formData = new FormData();
	formData.append('avatar', file);
	return await instance2.post('/upload/avatar', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: token
		}
	});
}
export default uploadAvatar;
