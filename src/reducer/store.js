import { configureStore } from "@reduxjs/toolkit"
import rosReducer from "./rosReducer"
import notificationReducer from "./notificationReducer"
import positionReducer from "./positionReducer"

const store = configureStore({
  reducer: {
    ros: rosReducer,
    notification: notificationReducer,
    position: positionReducer,
  },
})

export default store
