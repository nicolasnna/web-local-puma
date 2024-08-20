import { Box, Switch } from "@mui/material"
import PropTypes from 'prop-types'
import CameraView from "./components/CameraView"
import ConnectionRobotStatus from "@components/ConnectionRobot/ConnectionRobotStatus"
import Header from "@components/Header"
import MapView from "./components/MapView"
import RosConsoleLogs from "./components/RosConsoleLogs"
import RosParameters from "./components/RosParameters"
import { useSelector } from "react-redux"

const Dashboard = ({rosInstance}) => {
  const modeSelector = useSelector(state => state.ros.modeSelector)

  return (
    <>
      <Box className="grid-container-dashboard">
          <Box className="grid-container--sidecontent">
            <ConnectionRobotStatus/>
          </Box>
          <Box className="grid-container-dashboard--header">
            <Header Title={"Interfaz de monitoreo del Robot Puma"}>
              <Switch/>
            </Header>
          </Box>
          <Box className="grid-container-dashboard--realsense">
            <CameraView rosInstance={rosInstance}/>
          </Box>
          <Box className="grid-container-dashboard--consolelog">
            <RosConsoleLogs rosInstance={rosInstance}/>
          </Box>
          <Box className="grid-container-dashboard--map">
            <MapView rosInstance={rosInstance}/>
          </Box>
          <Box className="grid-container-dashboard--parameters">
            <RosParameters rosInstance={rosInstance} />
          </Box>
        </Box>
    </>
  )
}

Dashboard.propTypes = {
  rosInstance: PropTypes.object
}

export default Dashboard