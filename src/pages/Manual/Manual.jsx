import PropTypes from 'prop-types'
import Header from '@components/Header'
import { Box, Switch } from '@mui/material'
import ConnectionRobotStatus from '@components/ConnectionRobot/ConnectionRobotStatus'
import TeleopTwist from './components/TeleopTwist'
import CameraView from '@components/CameraView'
import MapView from '@components/MapView'
import { useDispatch, useSelector } from 'react-redux'
import { setModeSelector } from '@reducer/rosReducer'
import { MODE_SELECTOR_TOPIC } from '@utils/constants'

const Manual = ({rosInstance}) => {
  const modeSelector = useSelector(state => state.ros.modeSelector)
  const dispatch = useDispatch()
  const rosIsConnected = useSelector(state => state.ros.isConnected)
  
  const handleSwitchMode = () => {
    const newMode = modeSelector !== "manual" ? "manual" : "none"
    if (rosIsConnected) {
      dispatch(setModeSelector(newMode))
      rosInstance.sendMessage(
        MODE_SELECTOR_TOPIC,
        'std_msgs/String',
        {data: newMode}
      )
    }
  }

  return (
    <Box className="grid-container-manual">
      <Box className="grid-container-manual--header">
        <Header Title={"Modo manual"}>
          <Switch checked={modeSelector === "manual"} onChange={handleSwitchMode} className="custom-switch"/>
        </Header>
      </Box>
      <Box className="grid-container-manual--connection">
        <ConnectionRobotStatus rosInstance={rosInstance}/>
      </Box>
      <Box className="grid-container-manual--teleop" 
        sx={{opacity: modeSelector==="manual" ? 1 : 0.2}}>
        <TeleopTwist rosInstance={rosInstance}/>
      </Box>
      <Box className="grid-container-manual--map">
        <MapView 
          rosInstance={rosInstance} 
          showPath={true}
          widthMap={"40vw"}
          heightMap={"60vh"}
        />
      </Box>
      <Box className="grid-container-manual--camera">
        <CameraView rosInstance={rosInstance} />
      </Box>
    </Box>
  )
}

Manual.propTypes = {
  rosInstance: PropTypes.object
}

export default Manual