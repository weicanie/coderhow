import { instance2 } from '@/services/config';
import getFromLS from '@/utils/ls_get';
import { message } from 'antd';

async function getUserOwnInfo() {

  const userId = getFromLS('user')?.id;
  const token = getFromLS('user')?.token
  if (!token) {
    message.info('请先登录~')
    return;
  }
  console.log(userId)
	return await instance2.get(`/user/${userId}`);
}
export default getUserOwnInfo;