import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isTaskdrawerOpen: false,
};

const UtilSlice = createSlice({
  name: "Timer",
  initialState,
  reducers: {
    setTaskDrawerStatusAction: (state, action) => {
      state.isTaskdrawerOpen = action.payload;
    },
  },
});

export default UtilSlice.reducer;
export const { setTaskDrawerStatusAction } = UtilSlice.actions;
