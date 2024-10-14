import PropTypes from "prop-types"
import Header from "@components/Header"
import { Box, Stack, Switch } from "@mui/material"
import ConnectionRobotStatus from "@components/ConnectionRobot/ConnectionRobotStatus"
import TeleopTwist from "./components/TeleopTwist"
import CameraView from "@components/CameraView"
import MapView from "@components/MapView"
import { useDispatch, useSelector } from "react-redux"
import { setModeSelector } from "@reducer/rosReducer"
import { MODE_SELECTOR_TOPIC } from "@utils/constants"
import useWindowSize from "@hooks/useWindowSize"

const Manual = ({ rosInstance }) => {
  const modeSelector = useSelector((state) => state.ros.modeSelector)
  const dispatch = useDispatch()
  const rosIsConnected = useSelector((state) => state.ros.isConnected)
  const { width } = useWindowSize()

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
      dispatch(setModeSelector(newMode))
      rosInstance.sendMessage(MODE_SELECTOR_TOPIC, "std_msgs/String", {
        data: newMode,
      })
    }
  }

  return (
    <Box className="manual">
      <Stack
        gap={4}
        flexDirection={"row"}
        flexWrap={"wrap-reverse"}
        justifyContent={"space-around"}
      >
        <ConnectionRobotStatus rosInstance={rosInstance} />
        <Header Title={"Modo manual"}>
          <Switch
            checked={modeSelector === "manual"}
            onChange={handleSwitchMode}
            className="custom-switch"
          />
        </Header>
      </Stack>
      <Stack gap={4} flexDirection={"row"} flexWrap={"wrap"}>
        <TeleopTwist rosInstance={rosInstance} />
        <MapView
          rosInstance={rosInstance}
          showPath={true}
          widthMap={getWidthMap()}
          heightMap={"40vh"}
        />
        <CameraView rosInstance={rosInstance} />
      </Stack>
      {/* <Box
        className="grid-container-manual--teleop"
        sx={{ opacity: modeSelector === "manual" ? 1 : 0.2 }}
      >
        
      </Box>
      <Box className="grid-container-manual--map">
      </Box>
      <Box className="grid-container-manual--camera">
      </Box> */}
    </Box>
  )
}

Manual.propTypes = {
  rosInstance: PropTypes.object,
}

export default Manual
