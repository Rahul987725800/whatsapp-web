import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    message: "Initial message",
    count: 0,
  },
  reducers: {
    setMessage(state, action: PayloadAction<string>) {
      console.log(action.payload);
      state.message = action.payload;
    },
    setCount(state, action: PayloadAction<number>) {
      console.log(action.payload);
      state.count = action.payload;
    },
  },
});

export const { setMessage, setCount } = messageSlice.actions;
export default messageSlice.reducer;
