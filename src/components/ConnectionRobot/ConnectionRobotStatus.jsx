import React from "react"
import PropTypes from "prop-types"
import { Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import ConnectionRobotStatusItem from "./ConnectionRobotStatusItem"

const ConnectionRobotStatus = ({ extraClassName }) => {
  const isConnectedRos = useSelector((state) => state.ros.isConnected)
  const isConnectedPcPuma = false
  const isConnectedJetson = false

  return (
    <Box className={`connection-robot-status ${extraClassName}`}>
      <Typography className="connection-robot-status__title">
        Estado de la conexión
      </Typography>
      <ConnectionRobotStatusItem
        isConnected={isConnectedPcPuma}
        label="MiniPc Puma"
      />
      <ConnectionRobotStatusItem
        isConnected={isConnectedJetson}
        label="Jetson"
        needButton={true}
      />
      <ConnectionRobotStatusItem
        isConnected={isConnectedRos}
        label="ROS"
        needButton={true}
      />
    </Box>
  )
}

ConnectionRobotStatus.propTypes = {
  extraClassName: PropTypes.string,
}

export default ConnectionRobotStatus
