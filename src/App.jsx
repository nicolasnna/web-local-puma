import { Box, Container, Stack } from "@mui/material"
import CameraView from "./components/CameraView"
import Header from "./components/Header"
import RosConnectionControl from "./components/RosConnectionControl"
import RosConsoleLogs from "./components/RosConsoleLogs"
import useRos from "./hooks/useRos"
import { PaddingSize } from "./utils/constants"

function App() {
  const rosManager = useRos()

  return (
    <Container>
      <Box gap={3} display={"flex"} flexDirection="column" padding={PaddingSize.NORMAL}>
        <Header Title={"Monitoreo y control del robot puma"}/>
        <Stack flexDirection={"row"} gap={4} justifyContent="center" alignItems={"start"}>
          <RosConnectionControl rosInstance={rosManager}/>
          <RosConsoleLogs rosInstance={rosManager}/>
        </Stack>
        <CameraView rosInstance={rosManager}/>
      </Box>
    </Container>
  )
}

export default App
