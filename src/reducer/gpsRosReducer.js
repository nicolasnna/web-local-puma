import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  latLon: [],
  pathNav: [],
  activatePath: false,
  timeUploaded: "",
}

const gpsRosSlice = createSlice({
  name: "gpsRos",
  initialState,
  reducers: {
    setLatLon(state, action) {
      state.latLon = [action.payload.lat, action.payload.lon]
    },
    pushPathNav(state, action) {
      if (state.activatePath) {
        state.pathNav.push([action.payload.lat, action.payload.lon])
      }
    },
    clearPathNav(state) {
      state.pathNav = []
    },
    setTimeGps(state, action) {
      state.timeUploaded = action.payload
    },
    setActivatePath(state, action) {
      state.activatePath = action.payload
    },
  },
})

export const { setLatLon, pushPathNav, clearPathNav, setTimeGps } =
  gpsRosSlice.actions

export default gpsRosSlice.reducer
