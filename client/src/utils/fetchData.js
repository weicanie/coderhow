import Wei_useMemo from './wei_useMemo';
const weiMemo = new Wei_useMemo();
export default async function fetchData(setData, fetcher, flag, ...params) {
	// *flag控制数据是否更新
	const data = await fetcher(...params);
	weiMemo.wei_useMemo(() => {
		// *将新评论置顶?：还是提供'最新'功能比较好
		// data.comment.unshift(data.comment.pop())
		setData(data);
		console.log('fetchData', data);
	}, flag);
}
