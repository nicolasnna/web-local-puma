import Header from "@components/Header"
import useWindowSize from "@hooks/useWindowSize"
import { Box, Stack, Switch } from "@mui/material"
import { MODE_SELECTOR_TOPIC } from "@utils/constants"
import { useRosContext } from "@utils/RosContext"
import { useSelector } from "react-redux"
import ManagePathNav from "./components/ManagePathNav"
import MapAutonomous from "./components/MapAutonomous"
import RobotControl from "./components/RobotControl"

const Autonomous = () => {
  const modeSelector = useSelector((state) => state.ros.modeSelector)
  const rosIsConnected = useSelector((state) => state.ros.modeSelector)
  const rosInstance = useRosContext()

  const handleSwitchMode = () => {
    const newMode = modeSelector !== "autonomous" ? "autonomous" : "none"
    if (rosIsConnected) {
      rosInstance.sendMessage(MODE_SELECTOR_TOPIC, "std_msgs/String", {
        data: newMode,
      })
    }
  }

  return (
    <Box className="autonomous">
      <Stack
        flexDirection="row"
        gap={10}
        padding={0}
      >
        <MapAutonomous widthMap={"700px"} heightMap="450px" />
        <RobotControl/>
      </Stack>
      <ManagePathNav />
    </Box>
  )
}

Autonomous.propTypes = {}

export default Autonomous
