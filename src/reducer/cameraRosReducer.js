import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  image: "",
  timeUploaded: "",
  activate: false,
}

const cameraRosSlice = createSlice({
  name: "cameraRos",
  initialState,
  reducers: {
    setImage(state, action) {
      state.image = action.payload
    },
    setTime(state, action) {
      state.timeUploaded = action.payload
    },
    setActivate(state, action) {
      state.activate = action.payload
    },
  },
})

export const { setImage, setTime, setActivate } = cameraRosSlice.actions

export const updateCameraRos = (image, time) => {
  return async (dispatch) => {
    dispatch(setImage(image))
    dispatch(setTime(time))
    dispatch(setActivate(true))
  }
}

export default cameraRosSlice.reducer
