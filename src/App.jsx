import { Box, Container, Stack } from "@mui/material"
import CameraView from "./components/CameraView"
import ContainerElement from "./components/ContainerElement"
import Header from "./components/Header"
import MapView from "./components/MapView"
import RosConnectionControl from "./components/RosConnectionControl"
import RosConsoleLogs from "./components/RosConsoleLogs"
import useRos from "./hooks/useRos"
import { PaddingSize } from "./utils/constants"

function App() {
  const rosManager = useRos()

  return (
    <Container >
      <Box gap={3} display={"flex"} flexDirection="column" padding={PaddingSize.NORMAL}>
        <Header Title={"Monitoreo y control del robot puma"}/>
        <Stack flexDirection={"row"} gap={4} justifyContent="center" alignItems={"start"}>
          <RosConnectionControl rosInstance={rosManager}/>
          <RosConsoleLogs rosInstance={rosManager}/>
        </Stack>
        <Stack flexDirection={"row"} gap={1}>
          <ContainerElement Title={"Cámara Realsense"} Topic={'/camera/color/image_raw/compressed'}>
            <CameraView rosInstance={rosManager}/>
          </ContainerElement>
          <ContainerElement Title={"Ubicación Gps"} Topic={'/gps/fix'}>
            <MapView rosInstance={rosManager}/>
          </ContainerElement>
        </Stack>
      </Box>
    </Container>
  )
}

export default App
