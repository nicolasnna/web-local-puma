import { useRosContext } from "@utils/RosContext"
import CameraView from "@components/CameraView"
import Header from "@components/Header"
import MapView from "@components/Map/MapView"
import useWindowSize from "@hooks/useWindowSize"
import { Box, Stack, Switch } from "@mui/material"
import { MODE_SELECTOR_TOPIC } from "@utils/constants"
import { useSelector } from "react-redux"
import TeleopTwist from "./components/TeleopTwist"

const Manual = () => {
  const modeSelector = useSelector((state) => state.ros.modeSelector)
  const rosIsConnected = useSelector((state) => state.ros.isConnected)
  const { width } = useWindowSize()
  const rosInstance = useRosContext()

  const getWidthMap = () => {
    if (width < 768) {
      return "80vw"
    }
    if (width < 1279) {
      return "40vw"
    }
    return "30vw"
  }

  const handleSwitchMode = () => {
    const newMode = modeSelector !== "manual" ? "manual" : "none"
    if (rosIsConnected) {
      rosInstance.sendMessage(MODE_SELECTOR_TOPIC, "std_msgs/String", {
        data: newMode,
      })
    }
  }

  return (
    <Box className="manual" >
      <Header Title={"Modo manual"}>
        <Switch
          checked={modeSelector === "manual"}
          onChange={handleSwitchMode}
          className="custom-switch"
        />
      </Header>
      <Stack gap={4} flexDirection={"row"} flexWrap={"wrap"} padding={0}>
        <TeleopTwist />
        <MapView showPath={true} widthMap={getWidthMap()} heightMap={"40vh"} />
        <CameraView />
      </Stack>
    </Box>
  )
}

Manual.propTypes = {}

export default Manual
