import { createSlice } from "@reduxjs/toolkit"

const stateWaypointsSlice = createSlice({
  name: "stateWaypoints",
  initialState: {
    state: "sin conexión",
    pathPlanned: [],
    pathCompleted: []
  },
  reducers: {
    setState(state, action) {
      state.state = action.payload
    }
  }
})

export const {setState } = stateWaypointsSlice.actions

export default stateWaypointsSlice.reducer