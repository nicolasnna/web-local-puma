import { createSlice } from '@reduxjs/toolkit';

/*
  originGps, pathPlanned, pathCompleted, nextGoal : { latitude, longitude, yaw }
  waypoints: { latitude, longitude, yaw, label }
*/

const waypointsReducer = createSlice({
  name: 'waypoints',
  initialState: {
    robot: {
      state: 'sin conexión',
      currentIndex: 0,
      nextGoal: [],
      pathPlanned: [],
      pathCompleted: [],
      originGps: [],
      waypoints: [],
    },
    web: {
      waypoints: [],
      currentSelection: {}
    },
  },
  reducers: {
    setValue(state, action) {
      state[action.payload.from][action.payload.key] = action.payload.value;
    },
    pushValue(state, action) {
      if (Array.isArray(state[action.payload.from][action.payload.key])) {
        state[action.payload.from][action.payload.key].push(action.payload.value)
      }
    }
  },
});

export const { setValue, pushValue } = waypointsReducer.actions;

export const setWaypointsKeyValue = (from, key, value) => {
  return async (dispatch) => {
    await dispatch(setValue({ from, key, value }));
  };
};

export const pushWaypointsKeyValue = (from, key, value) => {
  return async (dispatch) => {
    await dispatch(pushValue({ from, key, value }));
  };
}


export default waypointsReducer.reducer;
