import { Container, Grid, Stack } from "@mui/material"
import CameraView from "./components/CameraView"
import ContainerElement from "./components/ContainerElement"
import Header from "./components/Header"
import MapView from "./components/MapView"
import RobotStatus from "./components/RobotStatus"
import RosConnectionControl from "./components/RosConnection/RosConnectionControl"
import RosConsoleLogs from "./components/RosConsoleLogs"
import useRos from "./hooks/useRos"
import { ODOM_TOPIC, ROSLOG_TOPIC } from "./utils/constants"
import './styles/components/_GridApp.sass'

function App() {
  const rosManager = useRos()

  return (
    <Container maxWidth disableGutters sx={{padding:'1em'}} >
      <Grid container spacing={1} sx={{ padding: 0, margin: 0, width: '100%' }}>
        <Grid className={"grid-item"} item xs={2} >
            algo
        </Grid>
        <Grid className={"grid-item"} item xs={8}>
          <Header Title={"Interfaz de Monitoreo del Robot Puma"}/>
        </Grid>
      </Grid>
      <Stack gap={3} padding={1}>
          <RosConnectionControl  rosInstance={rosManager} />
          <Stack flexDirection="row" gap={2} flexWrap="wrap">
            <ContainerElement Title={"Estado del robot"} Topic={ODOM_TOPIC}>
              <RobotStatus rosInstance={rosManager}/>
            </ContainerElement>
            <ContainerElement Title={"Logs ROS console"} Topic={ROSLOG_TOPIC}>
              <RosConsoleLogs rosInstance={rosManager} />
            </ContainerElement>
            <ContainerElement Title={"Cámara Realsense"} Topic={'/camera/color/image_raw/compressed'}>
              <CameraView rosInstance={rosManager} />
            </ContainerElement>
            <ContainerElement Title={"Ubicación Gps"} Topic={'/gps/fix'}>
              <MapView rosInstance={rosManager} />
            </ContainerElement>
          </Stack>
      </Stack>
    </Container>
  )
}

export default App
