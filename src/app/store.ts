import { configureStore } from "@reduxjs/toolkit";
import TrackControlReducer from "../slices/TrackControlSlice";
import TimerControlReducer from "../slices/TimerControlSlice";
import UtilReducer from "../util/UtilSlice";
const store = configureStore({
  reducer: {
    TrackControl: TrackControlReducer,
    TimerControl: TimerControlReducer,
    Util: UtilReducer,
  },
});

export default store;
