import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
	name: 'ui',
	initialState: { isCartOpen: false },
	reducers: {
		toggle(state) {
			state.isCartOpen = !state.isCartOpen;
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
