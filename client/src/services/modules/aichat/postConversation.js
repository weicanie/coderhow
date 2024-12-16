import getFromLS from "@/utils/ls_get";
import { instance2 } from "../../config";
import { message } from "antd";

export default async function postConversation(key, label, content) {
  const token = getFromLS('user')?.token;
  if (!token) {
    message.info('请先登录~')
    return;
  }
  const body = {key, label, content};
  return await instance2.post('/aichat/store', body, {
    headers:{
      Authorization: token
    },
  })
};