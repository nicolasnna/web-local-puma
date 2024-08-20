import React from 'react'
import PropTypes from 'prop-types'
import Header from '@components/Header'
import { Box } from '@mui/material'
import ConnectionRobotStatus from '@components/ConnectionRobot/ConnectionRobotStatus'
import TeleopTwist from './components/TeleopTwist'
import CameraView from '../Dashboard/components/CameraView'
import MapView from '../Dashboard/components/MapView'

const Manual = ({rosInstance}) => {
  return (
    <Box className="grid-container-manual">
      <Box className="grid-container-manual--header">
        <Header Title={"Modo manual"}/>
      </Box>
      <Box className="grid-container-manual--connection">
        <ConnectionRobotStatus rosInstance={rosInstance}/>
      </Box>
      <Box className="grid-container-manual--teleop">
        <TeleopTwist rosInstance={rosInstance}/>
      </Box>
      <Box className="grid-container-manual--map">
        <MapView rosInstance={rosInstance} showPath={true} />
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