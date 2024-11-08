import { useRosContext } from '@utils/RosContext'
import { Box, Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { WAYPOINTS_RESET_TOPIC, WAYPOINTS_SEND_TOPIC, WAYPOINTS_START_TOPIC, WAYPOINTS_STOP_TOPIC } from '@utils/constants'
import { infoNotification } from '@reducer/notificationReducer'

const ControlAutonomous = () => {
  const rosInstance = useRosContext()
  const dispatch = useDispatch()
  const stateWaypoint = useSelector(state => state.stateWaypoints.state)
  const arrayGpsPosition = useSelector(state => state.position.selectedPosition)

  const sendCommandWaypoint = (topic) => {
    rosInstance.sendMessage(
      topic,
      "std_msgs/Empty",
      {}
    )
  }

  const handleSendGoalGps = () => {
    const msgGps = arrayGpsPosition.map(p => {
      let dict = new Object()
      dict = {"latitude": p[0], "longitude": p[1]}
      return dict
      })
    rosInstance.sendMessage(WAYPOINTS_SEND_TOPIC, "puma_waypoints_msgs/GoalGpsArray", {data: msgGps})
    dispatch(infoNotification("Se ha enviado los waypoints gps al robot."))
  }

  const handleStart = () => {
    sendCommandWaypoint(WAYPOINTS_START_TOPIC)
    dispatch(infoNotification("Se ha enviado el comando de empezar."))
  }

  const handleStop = () => {
    sendCommandWaypoint(WAYPOINTS_STOP_TOPIC)
    dispatch(infoNotification("Se ha enviado el comando para detenerse."))
  }

  const handleResetPath = () => {
    sendCommandWaypoint(WAYPOINTS_RESET_TOPIC)
    dispatch(infoNotification("Se ha enviado el comando para limpiar la ruta."))
  }
  
  const buttonsList = [
    {key: "start-button",label: "Empezar", click: handleStart},
    {key: "stop-button",label: "Parar", click: handleStop},
    {key: "reset-button",label: "Limpiar plan", click: handleResetPath},
    {key: "upload-wpts-button",label: "Subir waypoints", click: handleSendGoalGps},
  ]

  return (
    <Box className="control-autonomous">
      <Box className="control-autonomous__title">
        <Typography>
          <b>Control autónomo</b>
        </Typography>
      </Box>
      <Box className="control-autonomous__state">
        <Typography>
          <b>Estado actual:</b>
        </Typography>
        <Typography>
          {stateWaypoint}
        </Typography>
      </Box>
      <Box className="control-autonomous__buttons-group">
        {buttonsList.map((b,index) => 
          <Button className='button--primary' key={b.key || index} onClick={b.click}>
            {b.label}
          </Button>
        )}
      </Box>
    </Box>
  )
}

ControlAutonomous.propTypes = {}

export default ControlAutonomous