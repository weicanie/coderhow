import { useEffect, useMemo, useState } from 'react';
import { shallowEqual, useDispatch } from 'react-redux';

// *抽取了组件发送网络请求获取数据的自定义hook
// *可以将请求到的数据保存在redux里进行共享
async function useFetchData(
	setData,
	{
		fetcher, //进行网络请求的函数
		asyncAcion
	},
	...params //fetcher/asyncAcion（会传入fetcher）参数
) {
	// *记录组件的状态，避免重复调用setData造成组件无限更新
	const [last, setLast] = useState({});
	let data;
	useMemo(async () => {
		data = await fetcher(...params);
		// *数据传给组件
		if (!shallowEqual(last, data)) {
			setLast(data);
			setData(data);
		}
	}, []);

	// *可选地将数据放入redux共享
	const dispatch = useDispatch();
	useEffect(() => {
		if (asyncAcion) {
			dispatch(asyncAcion(...params));
		}
	}, []);
}

export default useFetchData;
