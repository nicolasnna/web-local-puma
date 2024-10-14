import PropTypes from "prop-types"
import { Box, Stack, Switch } from "@mui/material"
import Header from "@components/Header"
import { useDispatch, useSelector } from "react-redux"
import { setModeSelector } from "@reducer/rosReducer"
import { MODE_SELECTOR_TOPIC } from "@utils/constants"
import ConnectionRobotStatus from "@components/ConnectionRobot/ConnectionRobotStatus"
import MapAutonomous from "./components/MapAutonomous"
import ManagePathNav from "./components/ManagePathNav"
import useWindowSize from "@hooks/useWindowSize"

const Autonomous = ({ rosInstance }) => {
  const modeSelector = useSelector((state) => state.ros.modeSelector)
  const rosIsConnected = useSelector((state) => state.ros.modeSelector)
  const dispatch = useDispatch()
  const { width } = useWindowSize()

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
      dispatch(setModeSelector(newMode))
      rosInstance.sendMessage(MODE_SELECTOR_TOPIC, "std_msgs/String", {
        data: newMode,
      })
    }
  }

  return (
    <Box className="autonomous">
      <Stack
        flexDirection="row"
        gap={4}
        flexWrap="wrap-reverse"
        justifyContent={"space-around"}
      >
        <ConnectionRobotStatus rosInstance={rosInstance} />
        <Header Title="Modo autónomo">
          <Switch
            checked={modeSelector === "autonomous"}
            onChange={handleSwitchMode}
            className="custom-switch"
          />
        </Header>
      </Stack>
      <Stack
        flexDirection="row"
        gap={4}
        flexWrap="wrap"
        justifyContent={"space-around"}
      >
        <ManagePathNav rosInstance={rosInstance} />
        <MapAutonomous
          rosInstance={rosInstance}
          widthMap={getWidthMap()}
          heightMap="50vh"
        />
      </Stack>
    </Box>
  )
}

Autonomous.propTypes = {
  rosInstance: PropTypes.object,
}

export default Autonomous
