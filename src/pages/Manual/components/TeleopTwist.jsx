import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import TurnLeftIcon from "@mui/icons-material/TurnLeft"
import TurnRightIcon from "@mui/icons-material/TurnRight"
import { Box, IconButton, Typography } from "@mui/material"
import {
  ACCELERATOR_TOPIC,
  DEG2RAD,
  DIRECTION_TOPIC,
  INITIAL_ACCEL,
  LIMIT_ACCEL,
  LIMIT_ANGLE,
  REVERSE_TOPIC
} from "@utils/constants"
import { useRosContext } from "@utils/RosContext"
import { useState } from "react"
import { useSelector } from "react-redux"

const TeleopTwist = () => {
  const rosInstance = useRosContext()

  const [angleDir, setAngleDir] = useState(0)
  const [accelValue, setAccelValue] = useState(INITIAL_ACCEL)
  const [reverse, setReverse] = useState(false)
  const incrementValues = 5
  const incrementAccelValues = 2
  const modeSelector = useSelector((state) => state.ros.modeSelector)
  const vel_x = Math.round(useSelector(state => state.odometryRobot.vel_x)*100) / 100
  const time_odom = useSelector(state => state.odometryRobot.time)
  

  const changeAccel = (newValue) => {
    rosInstance.sendMessage(ACCELERATOR_TOPIC, "std_msgs/Int16", {
      data: newValue,
    })
    rosInstance.sendMessage("/puma/brake/command", "puma_brake_msgs/BrakeCmd", {
      activate_brake: false,
    })
  }
  const changeDirection = (newValue) => {
    rosInstance.sendMessage(
      DIRECTION_TOPIC,
      "puma_direction_msgs/DirectionCmd",
      {
        activate: true,
        angle: newValue * DEG2RAD,
      }
    )
  }
  const changeReverse = (newValue) => {
    rosInstance.sendMessage(REVERSE_TOPIC, "std_msgs/Bool", { data: newValue })
    rosInstance.sendMessage("/puma/brake/command", "puma_brake_msgs/BrakeCmd", {
      activate_brake: true,
    })
  }

  const incrementAccel = () => {
    if (!reverse) {
      const newValue =
        accelValue < LIMIT_ACCEL
          ? accelValue + incrementAccelValues
          : accelValue
      setAccelValue(newValue)
      changeAccel(newValue)
    } else {
      const newValue =
        accelValue > INITIAL_ACCEL
          ? accelValue - incrementAccelValues
          : accelValue
      setAccelValue(newValue)
      setReverse(newValue > INITIAL_ACCEL)
      changeAccel(newValue)
      changeReverse(newValue > INITIAL_ACCEL)
    }
  }

  const decrementAccel = () => {
    if (!reverse) {
      const newValue =
        accelValue > INITIAL_ACCEL
          ? accelValue - incrementAccelValues
          : accelValue
      setReverse(newValue <= INITIAL_ACCEL)
      changeReverse(newValue <= INITIAL_ACCEL)
      changeAccel(newValue)
      setAccelValue(newValue)
    } else {
      const newValue =
        accelValue < LIMIT_ACCEL
          ? accelValue + incrementAccelValues
          : accelValue
      setAccelValue(newValue)
      changeAccel(newValue)
    }
  }

  const incrementAngle = () => {
    const newValue =
      angleDir < LIMIT_ANGLE ? angleDir + incrementValues : angleDir
    setAngleDir(newValue)
    changeDirection(newValue)
  }

  const decrementAngle = () => {
    const newValue =
      angleDir > -LIMIT_ANGLE ? angleDir - incrementValues : angleDir
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
    <Box
      className="teleop-twist"
      sx={{ opacity: modeSelector !== "manual" ? 0.5 : 1 }}
    >
      <Typography className="teleop-twist__title">Teleoperación</Typography>
      <Box className="teleop-twist__status">
        <Typography>
          <strong>Velocidad lineal:</strong> {vel_x} m/s
        </Typography>
        <Typography>
          <strong>Ángulo dirección</strong> {-angleDir} grados
        </Typography>
      </Box>
      <Box className="teleop-twist-buttons-grid">
        <IconButton
          disabled={modeSelector !== "manual"}
          onClick={incrementAccel}
          className="teleop-twist-buttons-grid--up"
        >
          <ArrowUpwardIcon className="teleop-icons" />
        </IconButton>
        <IconButton
          disabled={modeSelector !== "manual"}
          onClick={decrementAccel}
          className="teleop-twist-buttons-grid--down"
        >
          <ArrowDownwardIcon className="teleop-icons" />
        </IconButton>
        <IconButton
          disabled={modeSelector !== "manual"}
          onClick={resetValues}
          className="teleop-twist-buttons-grid--reset"
        >
          <RestartAltIcon className="teleop-icons" />
        </IconButton>
        <IconButton
          disabled={modeSelector !== "manual"}
          onClick={incrementAngle}
          className="teleop-twist-buttons-grid--left"
        >
          <TurnLeftIcon className="teleop-icons" />
        </IconButton>
        <IconButton
          disabled={modeSelector !== "manual"}
          onClick={decrementAngle}
          className="teleop-twist-buttons-grid--right"
        >
          <TurnRightIcon className="teleop-icons" />
        </IconButton>
      </Box>
      <Box>
        <Typography>Última actualización: {time_odom}</Typography>
      </Box>
    </Box>
  )
}

TeleopTwist.propTypes = {}

export default TeleopTwist
