import { configureStore } from "@reduxjs/toolkit"
import rosReducer from "./rosReducer"
import notificationReducer from "./notificationReducer"
import positionReducer from "./positionReducer"
import cameraRosReducer from "./cameraRosReducer"
import gpsRosReducer from "./gpsRosReducer"
import odometryRobotReducer from "./odometryRobotReducer"
import stateWaypointsReducer from './stateWaypointsReducer'

const store = configureStore({
  reducer: {
    ros: rosReducer,
    notification: notificationReducer,
    position: positionReducer,
    cameraRos: cameraRosReducer,
    gpsRos: gpsRosReducer,
    odometryRobot: odometryRobotReducer,
    stateWaypoints: stateWaypointsReducer
  },
})

export default store
