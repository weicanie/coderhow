import { instance2 } from '@/services/config';
import getFromLS from '@/utils/ls_get';
import { message } from 'antd';

async function uploadSign(sign) {

  const token = getFromLS('user')?.token;
  if (!token) {
    message.info('请先登录~')
    return;
  }
	return await instance2.post('/user/sign', {sign}, {
		headers: {
			Authorization: token,
		}
	});
}
export default uploadSign;