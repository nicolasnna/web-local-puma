import CameraView from "@components/CameraView"
import ConnectionRobotStatus from "@components/ConnectionRobot/ConnectionRobotStatus"
import Header from "@components/Header"
import MapView from "@components/MapView"
import useWindowSize from "@hooks/useWindowSize"
import { Box, Stack } from "@mui/material"
import PropTypes from "prop-types"
import RosConsoleLogs from "./components/RosConsoleLogs"

const Dashboard = ({ rosInstance }) => {
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

  return (
    <Box className="dashboard">
      <Stack
        flexDirection="row"
        justifyContent={"space-around"}
        gap={4}
        flexWrap={"wrap-reverse"}
      >
        <ConnectionRobotStatus extraClassName="grid-container-dashboard--robotstatus" />
        <Header
          Title="Interfaz de monitoreo PUMA"
          extraClassName="grid-container-dashboard--header"
        />
      </Stack>
      <Stack
        flexDirection="row"
        justifyContent={"space-around"}
        gap={2}
        flexWrap={"wrap"}
        width={"100%"}
      >
        <CameraView rosInstance={rosInstance} />
        <MapView widthMap={getWidthMap()} rosInstance={rosInstance} />
        <RosConsoleLogs rosInstance={rosInstance} />
      </Stack>
    </Box>
  )
}

Dashboard.propTypes = {
  rosInstance: PropTypes.object,
}

export default Dashboard
