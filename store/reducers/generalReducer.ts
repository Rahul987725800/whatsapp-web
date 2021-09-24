import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState = {
  showMainPopup: false,
  user: {
    name: '',
    phone: '',
  },
};
const generalSlice = createSlice({
  name: 'general',
  initialState: initialState,
  reducers: {
    setShowMainPopup(state, action: PayloadAction<boolean>) {
      state.showMainPopup = action.payload;
    },
    setUser(
      state,
      action: PayloadAction<{
        name: string;
        phone: string;
      }>,
    ) {
      state.user = action.payload;
    },
  },
});

export const { setShowMainPopup, setUser } = generalSlice.actions;
export default generalSlice.reducer;
