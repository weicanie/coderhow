//commit
//login
import coderhubCommit from '@/services/modules/commit-and-login';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const coderhubCommitAction = createAsyncThunk('coderhubCommit', async userInfo => {
	try {
		const data = await coderhubCommit(userInfo);
		return data;
	} catch (error) {
		console.log(error);
	}
});
const slice = createSlice({
	name: 'coderhubCommit',
	initialState: {
		user: null, //数据存放在ls里，这里只是走个过场，一刷新就没
		userAvatar: undefined //为了上传头像后自动更新页面
	},
	reducers: {
		updateUserAvatar(state, { payload }) {
			state.userAvatar = payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(coderhubCommitAction.fulfilled, (state, { payload }) => {
			state.user = payload;
		});
	}
});

export default slice.reducer;
export const { updateUserAvatar } = slice.actions;
export { coderhubCommitAction };
