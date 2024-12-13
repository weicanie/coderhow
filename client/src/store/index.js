import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './modules/header';
import coderhubReducer from './modules/commitAndLogin';
import articleListReducer from './modules/article-list';
const store = configureStore({
	reducer: {
		header: headerReducer,
		coderhub: coderhubReducer,
		articleList: articleListReducer
	}
});

export default store;
