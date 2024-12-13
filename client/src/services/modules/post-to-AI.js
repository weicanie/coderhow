import getFromLS from "@/utils/ls_get";
import { instance2 } from "../config";

export default async function postQuestionToAI(question) {
  const token = getFromLS('user')?.token;
/*   console.log(token, question)
  if (!token) {
    message.warning('请先登录~')
    return
  } */
  const body = {question};
  return await instance2.post('/aichat', body, {
    headers:{
      Authorization: token
    },
  })
};