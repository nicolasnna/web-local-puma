import { createSlice } from "@reduxjs/toolkit"

const stateWaypointsSlice = createSlice({
  name: "stateWaypoints",
  initialState: {
    state: "sin conexión",
    currentIndex: 0,
    nextGoal: [],
    pathPlanned: [],
    pathCompleted: [],
    originGps: [],
  },
  reducers: {
    setState(state, action) {
      state.state = action.payload
    },
    setPathPlanned(state, action) {
      state.pathPlanned = action.payload
    },
    setPathCompleted(state, action) {
      state.pathCompleted = action.payload
    },
    setOriginGps(state, action) {
      state.originGps = action.payload
    },
    setCurrentIndex(state, action) {
      state.currentIndex = action.payload
    },
    setNextGoal(state, action) {
      state.nextGoal = action.payload
    },
  },
})

export const {
  setState,
  setPathPlanned,
  setPathCompleted,
  setOriginGps,
  setCurrentIndex,
  setNextGoal,
} = stateWaypointsSlice.actions

export default stateWaypointsSlice.reducer
