import { configureStore } from "@reduxjs/toolkit";
import TrackControlReducer from "../features/DisplayTrackControls/TrackControlSlice";
import TimerControlReducer from "../features/Timer/TimerControlSlice";
import UtilReducer from "../util/UtilSlice";
const store = configureStore({
  reducer: {
    TrackControl: TrackControlReducer,
    TimerControl: TimerControlReducer,
    Util: UtilReducer,
  },
});

export default store;
