import { createSlice } from '@reduxjs/toolkit';
import { URL_ROS_DEFAULT } from '../utils/constants';

const initialState = {
  isConnected: false,
  rosUrl: URL_ROS_DEFAULT,
  message: []
};

const rosSlice = createSlice({
  name: 'ros',
  initialState,
  reducers: {
    setConnection(state, action) {
      state.isConnected = action.payload;
    },
    setRosUrl(state, action) {
      state.rosUrl = action.payload;
    },
    setMessage(state, action) {
      state.message.push(action.payload)
    }
  },
});

export const {
  setConnection,
  setRosUrl,
  setMessage
} = rosSlice.actions;

export default rosSlice.reducer;
