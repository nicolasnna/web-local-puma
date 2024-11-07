import Navbar from "@components/Navbar"
import Notification from "@components/Notification"
import useCurrentTime from "@hooks/useCurrentTime"
import useRos from "@hooks/useRos"
import Dashboard from "@pages/Dashboard/Dashboard"
import Manual from "@pages/Manual/Manual"
import { updateCameraRos } from "@reducer/cameraRosReducer"
import { pushPathNav, setLatLon, setTimeGps } from "@reducer/gpsRosReducer"
import { setMessage, setModeSelector, setTimeRos } from "@reducer/rosReducer"
import { CURRENT_MODE, GPS_TOPIC, ODOM_TOPIC, REALSENSE_TOPIC, ROSLOG_TOPIC } from "@utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import Autonomous from "./pages/Autonomous/Autonomous"
import { RosContext } from "@utils/RosContext"
import { addOdometryData } from "@reducer/odometryRobotReducer"

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
    } else {
      rosManager.openConnection()
    }
  }, [isConnected]) // eslint-disable-line

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
    const latlonCmd = { lat: Math.round(latitude * 1000)/1000, lon: Math.round(longitude * 1000)/1000 }
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
      <Navbar />
      <Notification />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/manual"
          element={<Manual />}
        />
        <Route
          path="/autonomous"
          element={<Autonomous/>}
        />
      </Routes>
    </RosContext.Provider>
  )
}

export default App
