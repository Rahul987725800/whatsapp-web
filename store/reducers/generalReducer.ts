import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserType {
  _id: string;
  name: string;
  phone: string;
  profile?: UserProfileType;
}
interface UserProfileType {
  _id: string;
  about: string;
  profilePhotoUrl: string;
  status: string;
  userId: string;
}
interface SliceGeneralStateType {
  showMainPopup: boolean;
  user: UserType | null;
}
const initialState: SliceGeneralStateType = {
  showMainPopup: false,
  user: null,
};
const generalSlice = createSlice({
  name: "general",
  initialState: initialState,
  reducers: {
    setShowMainPopup(state, action: PayloadAction<boolean>) {
      state.showMainPopup = action.payload;
    },
    setUser(state, action: PayloadAction<UserType | null>) {
      state.user = action.payload;
    },
  },
});

export const { setShowMainPopup, setUser } = generalSlice.actions;
export default generalSlice.reducer;
