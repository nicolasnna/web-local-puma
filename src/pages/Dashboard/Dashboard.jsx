import { Box } from "@mui/material"
import PropTypes from 'prop-types'
import CameraView from "./components/CameraView"
import ConnectionRobotStatus from "../../components/ConnectionRobot/ConnectionRobotStatus"
import Header from "../../components/Header"
import MapView from "./components/MapView"
import RosConsoleLogs from "./components/RosConsoleLogs"
import RosParameters from "./components/RosParameters"

const Dashboard = ({rosInstance}) => {
  return (
    <>
      <Box className="grid-container-dashboard">
          <Box className="grid-container--sidecontent">
            <ConnectionRobotStatus/>
          </Box>
          <Box className="grid-container-dashboard--header">
            <Header Title={"Interfaz de monitoreo del Robot Puma"}/>
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