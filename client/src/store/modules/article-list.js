import getArticleList from '@/services/modules/getArticleList';
import imageURLConcat from '@/utils/imageURLConcat';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const getArticleListAction = createAsyncThunk('articleList', async (extraInfo, store) => {
	try {
		const offset = extraInfo; //size先默认20
		const data = await getArticleList(offset);
		data.forEach(article => {
			// * 无配图的情况处理
			if (article.imagelist[0].id === null) return;
			article.imagelist = article.imagelist.map(item =>
				imageURLConcat(item.filename, item.mimetype)
			);
			// console.log('getArticleListAction', article)
		});
		return data;
	} catch (error) {
		console.log('getArticleListAction', error);
	}
});
const slice = createSlice({
	name: 'articleList',
	initialState: {
		articleList: null
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getArticleListAction.fulfilled, (state, { payload }) => {
				state.articleList = payload;
			})
			.addCase(getArticleListAction.rejected, () => {
				console.log('getArticleListAction', 'rejected');
			});
	}
});

export default slice.reducer;
export { getArticleListAction };
