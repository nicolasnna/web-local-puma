import { createSlice } from '@reduxjs/toolkit';
import data from '@/db.json'

const initialState = {
  isConnected: false,
  url: data.url_ros,
  message: [],
  timeMessage: '',
  controlMode: 'idle',
};

const rosSlice = createSlice({
  name: 'ros',
  initialState,
  reducers: {
    setConnection(state, action) {
      state.isConnected = action.payload;
    },
    setValue(state, action) {
      state[action.payload.key] = action.payload.value;
    },
    pushValue(state, action) {
      if (Array.isArray(state[action.payload.key])) {
        state[action.payload.key].push(action.payload.value);
      }
    },
  },
});

export const { setConnection, setValue, pushValue } = rosSlice.actions;

export const setRosValue = (key, value) => {
  return async (dispatch) => {
    await dispatch(setValue({ key, value }));
  };
};

export const pushRosValue = (key, value) => {
  return async (dispatch) => {
    await dispatch(pushValue({ key, value }));
  };
};

export default rosSlice.reducer;
