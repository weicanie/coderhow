import { instance2 } from '@/services/config';

export default async function getTagList() {
	const tagList = await instance2.get(`/tag`);
  const tags = tagList.map(item => item.content);
	return tags;
}