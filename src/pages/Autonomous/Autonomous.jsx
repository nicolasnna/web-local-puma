import Header from "@components/Header"
import useWindowSize from "@hooks/useWindowSize"
import { Box, Stack, Switch } from "@mui/material"
import { MODE_SELECTOR_TOPIC } from "@utils/constants"
import { useRosContext } from "@utils/RosContext"
import { useSelector } from "react-redux"
import ManagePathNav from "./components/ManagePathNav"
import MapAutonomous from "./components/MapAutonomous"

const Autonomous = () => {
  const modeSelector = useSelector((state) => state.ros.modeSelector)
  const rosIsConnected = useSelector((state) => state.ros.modeSelector)
  const { width } = useWindowSize()
  const rosInstance = useRosContext()

  const getWidthMap = () => {
    if (width < 768) {
      return "80vw"
    }
    if (width < 1279) {
      return "40vw"
    }
    return "50vw"
  }

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
      <Header Title="Modo autónomo">
        <Switch
          checked={modeSelector === "autonomous"}
          onChange={handleSwitchMode}
          className="custom-switch"
        />
      </Header>
      <Stack
        flexDirection="row"
        gap={4}
        flexWrap="wrap"
        justifyContent={"space-around"}
        padding={0}
      >
        <ManagePathNav />
        <MapAutonomous widthMap={getWidthMap()} heightMap="50vh" />
      </Stack>
    </Box>
  )
}

Autonomous.propTypes = {}

export default Autonomous
