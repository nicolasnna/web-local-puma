import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, IconButton, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon  from '@mui/icons-material/ArrowDownward'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TurnRightIcon from '@mui/icons-material/TurnRight';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import { ACCELERATOR_TOPIC, DEG2RAD, DIRECTION_TOPIC, INITIAL_ACCEL, LIMIT_ACCEL, LIMIT_ANGLE, ODOM_TOPIC, REVERSE_TOPIC } from '@utils/constants'

const TeleopTwist = ({rosInstance}) => {
  const rosIsAlive = useSelector(state => state.ros.isConnected)
  const [velX, setVelX] = useState(0)
  const [angleDir, setAngleDir] = useState(0)
  const [accelValue, setAccelValue] = useState(INITIAL_ACCEL)
  const [reverse, setReverse] = useState(false)  
  const incrementValues = 5
  const incrementAccelValues = 3

  useEffect(() => {
    if(rosIsAlive) {
      rosInstance.subscribe(ODOM_TOPIC, 'nav_msgs/Odometry', receivedOdometry)
    }
  },[rosIsAlive])

  const receivedOdometry = (message) => {
    const newVel = Math.round(message.twist.twist.linear.x*100)/100
    const changeVel = Math.abs(velX-newVel)>0.1 ? newVel : velX
    setVelX(changeVel)
  } 

  const changeAccel = (newValue) => {
    rosInstance.sendMessage(
      ACCELERATOR_TOPIC,
      'std_msgs/Int16',
      {data: newValue}
    )}
  const changeDirection = (newValue) =>{
    rosInstance.sendMessage(
      DIRECTION_TOPIC,
      'puma_direction_msgs/DirectionCmd',
      {
        activate: true,
        angle: (newValue)*DEG2RAD
      } )}
  const changeReverse = (newValue) => {
    rosInstance.sendMessage(
      REVERSE_TOPIC,
      'std_msgs/Bool',
      {data: newValue}
    )
  }

  const incrementAccel = () => {
    if (!reverse) {
      const newValue = accelValue<LIMIT_ACCEL ? accelValue+incrementAccelValues : accelValue
      setAccelValue(newValue)
      changeAccel(newValue)
    } else {
      const newValue = accelValue>INITIAL_ACCEL ? accelValue-incrementAccelValues : accelValue
      console.log(newValue)
      setAccelValue(newValue)
      setReverse(newValue>INITIAL_ACCEL)
      changeAccel(newValue)
      changeReverse(newValue>INITIAL_ACCEL)
    }
  }

  const decrementAccel = () => {
    if (!reverse) {
      const newValue = accelValue>INITIAL_ACCEL ? accelValue-incrementAccelValues : accelValue
      setReverse(newValue<=INITIAL_ACCEL)
      changeReverse(newValue<=INITIAL_ACCEL)
      changeAccel(newValue)
      setAccelValue(newValue)
    } else {
      const newValue = accelValue<LIMIT_ACCEL ? accelValue+incrementAccelValues : accelValue
      setAccelValue(newValue)
      changeAccel(newValue)
    } 
  }

  const incrementAngle = () => {
    const newValue = angleDir<LIMIT_ANGLE ? angleDir+incrementValues : angleDir
    setAngleDir(newValue)
    changeDirection(newValue)
  }

  const decrementAngle = () => {
    const newValue = angleDir>-LIMIT_ANGLE ? angleDir-incrementValues : angleDir
    setAngleDir(newValue)
    changeDirection(newValue)
  }

  const resetValues = () => {
    setAngleDir(0)
    changeDirection(0)
    setAccelValue(INITIAL_ACCEL)
    changeAccel(INITIAL_ACCEL)
  }

  return (
    <Box className="teleop-twist">
      <Typography className='teleop-twist__title'>Teleoperación</Typography>
      <Box className="teleop-twist__status">
        <Typography>
          <strong>Velocidad lineal:</strong> {velX} m/s
        </Typography>
        <Typography>
          <strong>Ángulo dirección</strong> {-angleDir} grados
        </Typography>
      </Box>
      <Box className="teleop-twist-buttons-grid">
        <IconButton onClick={incrementAccel}  className="teleop-twist-buttons-grid--up">
          <ArrowUpwardIcon className="teleop-icons"/>
        </IconButton>
        <IconButton onClick={decrementAccel} className="teleop-twist-buttons-grid--down">
          <ArrowDownwardIcon className="teleop-icons"/>
        </IconButton>
        <IconButton onClick={resetValues} className="teleop-twist-buttons-grid--reset">
          <RestartAltIcon className="teleop-icons"/>
        </IconButton>
        <IconButton onClick={incrementAngle} className="teleop-twist-buttons-grid--left">
          <TurnLeftIcon className="teleop-icons"/>
        </IconButton>
        <IconButton onClick={decrementAngle} className="teleop-twist-buttons-grid--right">
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