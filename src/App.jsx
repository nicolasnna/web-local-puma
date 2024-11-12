import CameraView from "@components/CameraView"
import RobotControl from "@components/Control/RobotControl"
import Header from "@components/Header"
import TablePositionList from "@components/TablePositionList"
import { MapAutonomous } from "@components/Map"
import Notification from "@components/Notification"
import RosConsoleLogs from "@components/RosConsoleLogs"
import useCurrentTime from "@hooks/useCurrentTime"
import useRos from "@hooks/useRos"
import { Box } from "@mui/material"
import { updateCameraRos } from "@reducer/cameraRosReducer"
import { pushPathNav, setLatLon, setTimeGps } from "@reducer/gpsRosReducer"
import { addOdometryData } from "@reducer/odometryRobotReducer"
import { setMessage, setModeSelector, setTimeRos } from "@reducer/rosReducer"
import {
  setCurrentIndex,
  setNextGoal,
  setOriginGps,
  setPathCompleted,
  setPathPlanned,
  setState,
} from "@reducer/stateWaypointsReducer"
import {
  CURRENT_MODE,
  GPS_TOPIC,
  ODOM_TOPIC,
  REALSENSE_TOPIC,
  ROSLOG_TOPIC,
  WAYPOINTS_GPS_NAV_INFO,
  WAYPOINTS_STATE_STATUS,
} from "@utils/constants"
import { RosContext } from "@utils/RosContext"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedPosition } from "@reducer/positionReducer"

function App() {
  const rosManager = useRos()
  const isConnected = useSelector((state) => state.ros.isConnected)
  const currentTime = useCurrentTime()
  const position = useSelector((state) => state.position)
  const dispatch = useDispatch()
  const [listWaypointsRobot, setListWaypointsRobot] = useState([])
  const [labelWaypointsRobot, setLabelWaypointsRobot] = useState([])

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
      rosManager.subscribe(
        WAYPOINTS_STATE_STATUS,
        "smach_msgs/SmachContainerStatus",
        callbackStateWaypoints
      )
      rosManager.subscribe(
        WAYPOINTS_GPS_NAV_INFO,
        "puma_waypoints_msgs/GoalGpsNavInfo",
        callbackGpsNavInfo
      )
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
    dispatch(addOdometryData(message, currentTime.getCurrentTime()))
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
        `${currentTime.getCurrentTime()} [${message.level}] ${message.name}: ${
          message.msg
        }`
      )
    )
    dispatch(setTimeRos(currentTime.getCurrentTime()))
  }
  const callbackGpsNavInfo = (message) => {
    const { index_from, start, next_goal, goals } = message
    dispatch(setOriginGps([start.latitude, start.longitude]))
    dispatch(setCurrentIndex(index_from))
    dispatch(setNextGoal(next_goal))
    let labelWaypoints = ["Inicio"]
    let valuesWaypoints = [[start.latitude, start.longitude]]
    const goalsArray = goals.map(g => [g.latitude, g.longitude])
    if (index_from === 0) {
      dispatch(setPathPlanned(goalsArray))
      labelWaypoints = [...labelWaypoints, ...goalsArray.map((g,i) => `Planeado ${i+1}`)]
      valuesWaypoints = [...valuesWaypoints, ...goalsArray]
    } else {
      let goalsArrayCopy = goalsArray
      const completed = goalsArrayCopy.splice(0, index_from)
      labelWaypoints = [...labelWaypoints, ...completed.map((g,i) => `Completado ${i+1}`),...goalsArray.map((g,i) => `Planeado ${i+1}`)]
      valuesWaypoints = [...valuesWaypoints, ...completed,...goalsArray]
      dispatch(setPathPlanned(goalsArrayCopy))
      dispatch(setPathCompleted(completed))
    }
    setLabelWaypointsRobot(labelWaypoints)
    setListWaypointsRobot(valuesWaypoints)
  }

  return (
    <RosContext.Provider value={rosManager}>
      <Notification />
      <Box className="dashboard">
        <Box className="dashboard__row">
          <Box className="dashboard__side" height={"100%"}>
            <Header title="Panel de control Robot Seguridad PUMA" />
            <MapAutonomous widthMap="800px" heightMap="500px" />
          </Box>
          <Box className="dashboard__side">
            <RobotControl />
            <CameraView />
          </Box>
        </Box>
        <Box className="dashboard__row">
          <TablePositionList
            title="Destinos creados en mapa"
            valueList={position.selectedPosition}
            labelList={position.labelSelection}
            addChangePosition={true}
            setValueList={setSelectedPosition}
          />
          <TablePositionList
            title="Destinos subidos en robot"
            valueList={listWaypointsRobot}
            labelList={labelWaypointsRobot}
          />
          <RosConsoleLogs />
        </Box>
      </Box>
    </RosContext.Provider>
  )
}

export default App
