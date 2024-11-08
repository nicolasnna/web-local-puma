import CameraView from "@components/CameraView"
import Notification from "@components/Notification"
import useCurrentTime from "@hooks/useCurrentTime"
import useRos from "@hooks/useRos"
import { Box, Stack } from "@mui/material"
import ManagePathNav from "@components/ManagePathNav"
import RobotControl from "@components/Control/RobotControl"
import RosConsoleLogs from "@components/RosConsoleLogs"
import { updateCameraRos } from "@reducer/cameraRosReducer"
import { pushPathNav, setLatLon, setTimeGps } from "@reducer/gpsRosReducer"
import { addOdometryData } from "@reducer/odometryRobotReducer"
import { setMessage, setModeSelector, setTimeRos } from "@reducer/rosReducer"
import { setState } from "@reducer/stateWaypointsReducer"
import { CURRENT_MODE, GPS_TOPIC, ODOM_TOPIC, REALSENSE_TOPIC, ROSLOG_TOPIC, WAYPOINTS_STATE_STATUS } from "@utils/constants"
import { RosContext } from "@utils/RosContext"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import MapAutonomous from "@components/Map/MapAutonomous"
import Header from "@components/Header"

function App() {
  const rosManager = useRos()
  const isConnected = useSelector((state) => state.ros.isConnected)
  const currentTime = useCurrentTime()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isConnected) {
      // Camera Realsense
      rosManager.subscribe(
        REALSENSE_TOPIC,
        "sensor_msgs/CompressedImage",
        callbackCamera
      )
      // Gps
      rosManager.subscribe(GPS_TOPIC, "sensor_msgs/NavSatFix", callbackGps)
      // Console logs
      rosManager.subscribe(ROSLOG_TOPIC, "rosgraph_msgs/Log", callbackLogs)
      rosManager.subscribe(ODOM_TOPIC, "nav_msgs/Odometry", callbackOdometry)
      rosManager.subscribe(CURRENT_MODE, "std_msgs/String", callbackModePuma)
      // Maquina de estados
      rosManager.subscribe(WAYPOINTS_STATE_STATUS, "smach_msgs/SmachContainerStatus", callbackStateWaypoints)
    } else {
      rosManager.openConnection()
    }
  }, [isConnected]) // eslint-disable-line

  const callbackStateWaypoints = (message) => {
    const { active_states } = message
    if (Array.isArray(active_states)) {
      dispatch(setState(active_states[0]))
    }
  }

  const callbackModePuma = (message) => {
    dispatch(setModeSelector(message.data))
  }

  const callbackOdometry = (message) => {
    dispatch(addOdometryData(message,currentTime.getCurrentTime()))
  }

  const callbackCamera = (message) => {
    dispatch(
      updateCameraRos(
        `data:image/jpeg;base64,${message.data}`,
        currentTime.getCurrentTime()
      )
    )
  }

  const callbackGps = (message) => {
    const { latitude, longitude } = message
    const latlonCmd = { lat: latitude, lon: longitude }
    dispatch(setLatLon(latlonCmd))
    dispatch(pushPathNav(latlonCmd))
    dispatch(setTimeGps(currentTime.getCurrentTime()))
  }

  const callbackLogs = (message) => {
    dispatch(
      setMessage(
        `${currentTime.getCurrentTime()} [${message.level}] ${message.name}: ${message.msg}`
      )
    )
    dispatch(setTimeRos(currentTime.getCurrentTime()))
  }

  return (
    <RosContext.Provider value={rosManager}>
      <Notification />
      <Box className="dashboard" >
        <Box className="dashboard__row">
          <Box className="dashboard__side" height={"100%"}>
            <Header title="Panel de control Robot Seguridad PUMA"/>
            <MapAutonomous widthMap="800px" heightMap="500px" />
          </Box>
          <Box className="dashboard__side">
            <RobotControl/>
            <CameraView/>
          </Box>
        </Box>
        <Box className="dashboard__row"> 
          <ManagePathNav />
          <RosConsoleLogs />
        </Box>
      </Box>
    </RosContext.Provider>
  )
}

export default App
