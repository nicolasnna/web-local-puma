import CameraView from "@components/CameraView"
import Header from "@components/Header"
import MapView from "@components/Map/MapView"
import useWindowSize from "@hooks/useWindowSize"
import { Box, Stack } from "@mui/material"
import RosConsoleLogs from "./components/RosConsoleLogs"

const Dashboard = () => {
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
      <Header
        Title="Interfaz de monitoreo PUMA"
        extraClassName="grid-container-dashboard--header"
      />
      <Stack
        flexDirection="row"
        justifyContent={"space-around"}
        gap={3}
        flexWrap={"wrap"}
        width={"max-content"}
        padding={0}
      >
        <CameraView />
        <MapView widthMap={getWidthMap()} />
        <RosConsoleLogs />
      </Stack>
    </Box>
  )
}

Dashboard.propTypes = {}

export default Dashboard
