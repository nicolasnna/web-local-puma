import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    label: "",
    severity: "success",
    color: "success",
    on: false,
  },
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    changeOnNotification(state, action) {
      state.on = action.payload
    },
  },
})

export const { setNotification, changeOnNotification } =
  notificationSlice.actions

export const successNotification = (text) => {
  return async (dispatch) => {
    const option = {
      label: text,
      severity: "success",
      color: "success",
      on: true,
    }
    setTimeout(() => dispatch(setNotification(option)), 50)
  }
}

export const infoNotification = (text) => {
  return async (dispatch) => {
    const option = {
      label: text,
      severity: "success",
      color: "info",
      on: true,
    }
    setTimeout(() => dispatch(setNotification(option)), 50)
  }
}

export const errorNotification = (text) => {
  return async (dispatch) => {
    const option = {
      label: text,
      severity: "error",
      color: "error",
      on: true,
    }
    setTimeout(() => dispatch(setNotification(option)), 50)
  }
}

export default notificationSlice.reducer
