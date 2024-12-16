import getFromLS from "@/utils/ls_get";
import { instance2 } from "../../config";
import { message } from "antd";

export default async function postQuestionToAI(question, messages) {
  const token = getFromLS('user')?.token;
  if (!token) {
    message.info('未登录的情况下,无法保存历史会话~')
  }
  const body = {question, messages};
  return await instance2.post('/aichat', body, {
    headers:{
      Authorization: token
    },
  })
};