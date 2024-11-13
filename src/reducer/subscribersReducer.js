import { createSlice } from '@reduxjs/toolkit';

const subscribersSlice = createSlice({
  name: 'subscribers',
  initialState: {
    camera: {
      image: '',
      time: '',
    },
    gps: {
      latitude: -33.421946,
      longitude: -70.5819,
      pathNav: [],
      activePath: false,
      time: '',
    },
    odometry: {
      velX: 0,
      yaw: 0,
      time: '',
    },
  },
  reducers: {
    setSubscribeTopicValues(state, action) {
      state[action.payload.topic] = action.payload.values;
    },
    pushSubscribeKeyValue(state, action) {
      if (Array.isArray(state[action.payload.topic][action.payload.key])) {
        state[action.payload.topic][action.payload.key].push(
          action.payload.value
        );
      }
    },
  },
});

export const { setSubscribeTopicValues, pushSubscribeKeyValue } =
  subscribersSlice.actions;

export const setTopicValues = (topic, values) => {
  return async (dispatch) => {
    await dispatch(setSubscribeTopicValues({ topic, values }));
  };
};

export const pushTopicKeyValue = (topic, key, value) => {
  return async (dispatch) => {
    await dispatch(pushSubscribeKeyValue({ topic, key, value }));
  };
};

export default subscribersSlice.reducer;
