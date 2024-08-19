import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, IconButton, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon  from '@mui/icons-material/ArrowDownward'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TurnRightIcon from '@mui/icons-material/TurnRight';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import { DEG2RAD, DIRECTION_TOPIC, ODOM_TOPIC } from '../../../utils/constants'

const TeleopTwist = ({rosInstance}) => {
  const rosIsAlive = useSelector(state => state.ros.isConnected)
  const [velX, setVelX] = useState(0)
  const [angleDir, setAngleDir] = useState(0)
  const incrementValues = 5

  useEffect(() => {
    if(rosIsAlive) {
      rosInstance.subscribe(ODOM_TOPIC, 'nav_msgs/Odometry', receivedOdometry)
    }
  },[rosIsAlive])

  const receivedOdometry = (message) => {
    setVelX(Math.round(message.twist.twist.linear.x*1000)/1000)
  } 

  const incrementAngle = () => {
    setAngleDir(angleDir+incrementValues)
    rosInstance.sendMessage(
      DIRECTION_TOPIC,
      'puma_direction_msgs/DirectionCmd',
      {
        activate: true,
        angle: (angleDir+incrementValues)*DEG2RAD
      }
    )
    console.log("enviado")
  }

  return (
    <Box className="teleop-twist">
      <Typography className='teleop-twist__title'>Teleoperación</Typography>
      <Box className="teleop-twist__status">
        <Typography>
          <strong>Velocidad lineal:</strong> {velX} m/s
        </Typography>
        <Typography>
          <strong>Ángulo dirección</strong> 15 grados
        </Typography>
      </Box>
      <Box className="teleop-twist-buttons-grid">
        <IconButton className="teleop-twist-buttons-grid--up">
          <ArrowUpwardIcon className="teleop-icons"/>
        </IconButton>
        <IconButton className="teleop-twist-buttons-grid--down">
          <ArrowDownwardIcon className="teleop-icons"/>
        </IconButton>
        <IconButton className="teleop-twist-buttons-grid--reset">
          <RestartAltIcon className="teleop-icons"/>
        </IconButton>
        <IconButton className="teleop-twist-buttons-grid--left">
          <TurnLeftIcon className="teleop-icons"/>
        </IconButton>
        <IconButton onClick={incrementAngle} className="teleop-twist-buttons-grid--right">
          <TurnRightIcon className="teleop-icons"/>
        </IconButton>
      </Box>
    </Box>
  )
}

TeleopTwist.propTypes = {
  rosInstance: PropTypes.object
}

export default TeleopTwist