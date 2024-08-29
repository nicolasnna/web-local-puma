import PropTypes from 'prop-types'
import { Box, Switch } from '@mui/material'
import Header from '@components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { setModeSelector } from '@reducer/rosReducer'
import { MODE_SELECTOR_TOPIC } from '@utils/constants'
import ConnectionRobotStatus from '@components/ConnectionRobot/ConnectionRobotStatus'
import MapAutonomous from './components/MapAutonomous'
import ManagePathNav from './components/ManagePathNav'

const Autonomous = ({rosInstance}) => {
  const modeSelector = useSelector(state => state.ros.modeSelector)
  const rosIsConnected = useSelector(state => state.ros.modeSelector)
  const dispatch = useDispatch()

  const handleSwitchMode = () => {
    const newMode = modeSelector !== "autonomous" ? "autonomous" : "none"
    if (rosIsConnected){
      dispatch(setModeSelector(newMode))
      rosInstance.sendMessage(
        MODE_SELECTOR_TOPIC,
        'std_msgs/String',
        {data: newMode}
      )
    }
  }

  return (
    <Box className="grid-container-autonomous">
      <Box className="grid-container-autonomous--header">
        <Header Title="Modo autónomo">
          <Switch checked={modeSelector === "autonomous"} onChange={handleSwitchMode} className="custom-switch"/>
        </Header>
      </Box>
      <Box className="grid-container-autonomous--connection">
        <ConnectionRobotStatus rosInstance={rosInstance}/>
      </Box>
      <Box className="grid-container-autonomous--path-manager">
        <ManagePathNav/>
      </Box>
      <Box className="grid-container-autonomous--map-manager">
        <MapAutonomous rosInstance={rosInstance} widthMap='40vw' heightMap='50vh'/>
      </Box>
    </Box>
  )
}

Autonomous.propTypes = {
  rosInstance: PropTypes.object
}

export default Autonomous