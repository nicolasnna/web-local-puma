import { configureStore } from "@reduxjs/toolkit"
import rosReducer from "./rosReducer"
import notificationReducer from "./notificationReducer"
import subscribersReducer from './subscribersReducer'
import waypointsReducer from './waypointsReducer'

const store = configureStore({
  reducer: {
    ros: rosReducer,
    notification: notificationReducer,
    subscribers: subscribersReducer,
    waypoints: waypointsReducer
  },
})

export default store
