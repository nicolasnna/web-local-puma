import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { ODOM_TOPIC } from '../utils/constants'

const odom_initial = {
  vel_x: 0,
  vel_y: 0,
  pos_x: 0,
  pos_y: 0
}

const RobotStatus = ({rosInstance}) => {
  const isConnectedRos = useSelector(state=> state.ros.isConnected)
  const [odomStatus, setOdomStatus] = useState(odom_initial)

  useEffect(() => {
    if (isConnectedRos) {
      rosInstance.subscribe(ODOM_TOPIC, '/nav_msgs/Odometry',callbackOdometry)
    }
  }, [isConnectedRos])
  
  const callbackOdometry = (msg) => {
    setOdomStatus({
      vel_x: Math.round(msg.twist.twist.linear.x *100)/100,
      vel_y: Math.round(msg.twist.twist.linear.y *100)/100,
      pos_x: Math.round(msg.pose.pose.position.x *100)/100,
      pos_y: Math.round(msg.pose.pose.position.y *100)/100,
    })
  }

  return (
    <Stack width='max-content' height={'max-content'} alignItems="center" justifyContent="center" padding={2}>
      <Stack flexDirection={'row'} alignItems={"center"} justifyContent="center" gap={2} height="max-content" padding={'0.2em'}>
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: isConnectedRos ? 'rgb(0,200,0,0.9)' : 'rgb(200,0,0,0.9)',
          }}
        ></div>
        <Typography align='center' fontSize={'1.3em'}>{isConnectedRos ? "Encendido" : "Apagado"}</Typography>
      </Stack>
      <Stack flexDirection={'row'} alignItems={"center"} justifyContent="center" gap={2} height="max-content" padding={'0.2em'}>
        <Typography align='center' fontSize={'1.3em'}>Posición local</Typography>
        <Typography align='center'><strong>X</strong>: {odomStatus.pos_x} mts</Typography>
        <Typography align='center'><strong>Y</strong>: {odomStatus.pos_y} mts</Typography>
      </Stack>
      <Stack flexDirection={'row'} alignItems={"center"} justifyContent="center" gap={2} height="max-content" padding={'0.2em'}>
        <Typography align='center' fontSize={'1.3em'}>Velocidad</Typography>
        <Typography align='center'><strong>X</strong>: {odomStatus.vel_x} m/s</Typography>
        <Typography align='center'><strong>Y</strong>: {odomStatus.vel_y} m/s</Typography>
      </Stack>
    </Stack>
  )
}

RobotStatus.propTypes = {
  rosInstance: PropTypes.obj
}

export default RobotStatus