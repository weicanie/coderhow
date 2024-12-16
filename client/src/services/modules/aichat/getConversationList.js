import getFromLS from "@/utils/ls_get";
import { instance2 } from "../../config";
import { message } from "antd";

export default async function getConversationList() {
  const token = getFromLS('user')?.token;
  if (!token) {
    message.info('请先登录~')
    return;
  }
  return await instance2.get('/aichat', {
    headers:{
      Authorization: token
    },
  })
};