import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'header',
	initialState: {
		pageName: 'home',
		isOut: false,
		bgColor: 'white',
		windowScrollHandler: null
	},
	reducers: {
		setIsOut(state, { payload }) {
			state.isOut = payload;
		},
		setBgColor(state, { payload }) {
			state.bgColor = payload;
		},
		setPageName(state, { payload }) {
			state.pageName = payload;
		},
		setWindowScrollHandler(state, { payload }) {
			state.windowScrollHandler = payload;
		}
	}
});

export default slice.reducer;
export const { setIsFixed, setIsOut, setBgColor, setPageName, setWindowScrollHandler } =
	slice.actions;
