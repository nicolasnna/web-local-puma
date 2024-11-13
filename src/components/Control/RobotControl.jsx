import ContainerElement from '@components/ContainerElement'
import ControlAutonomous from '@components/Control/ControlAutonomous'
import ControlManual from '@components/Control/ControlManual'
import StatusAlive from '@components/Status/StatusAlive'
import StatusController from '@components/Status/StatusController'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const RobotControl = () => {
  const isConnected = useSelector(state => state.ros.isConnected)
  const modeController = useSelector(state => state.ros.controlMode)

  return (
    <ContainerElement
      Title='Control Robot PUMA'
    >
      <Box className="robot-status">
        <Box className="robot-status__status">
          <Typography className="robot-status__status__text">
            Estado: 
          </Typography>
          <StatusAlive isAlive={isConnected}/>
        </Box>
        <Box className="robot-status__status">
          <Typography className="robot-status__status__text">
            Batería: 0%
          </Typography>
        </Box>
        <Box className="robot-status__status">
          <Typography className="robot-status__status__text">
            Modo controlador:
          </Typography>
          <StatusController/>
        </Box>
        <ControlAutonomous/>
        {modeController === "manual" && <ControlManual/>}
      </Box>
    </ContainerElement>
  )
}

RobotControl.propTypes = {}

export default RobotControl