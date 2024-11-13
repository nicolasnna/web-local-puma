import { Box, IconButton, Typography } from '@mui/material'
import { RosContext } from '@utils/RosProvider'
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import BlockIcon from '@mui/icons-material/Block';
import TurnLeftIcon from "@mui/icons-material/TurnLeft"
import TurnRightIcon from "@mui/icons-material/TurnRight"
import { useContext, useState } from 'react'
import { ACCELERATOR_TOPIC, BRAKE_TOPIC, DEG2RAD, DIRECTION_TOPIC, INITIAL_ACCEL, LIMIT_ACCEL, LIMIT_ANGLE, REVERSE_TOPIC } from '@utils/constants'
import { useSelector } from 'react-redux'

const ControlManual = () => {
  const ros = useContext(RosContext)
  const [angleDir, setAngleDir] = useState(0)
  const [accelValue, setAccelValue] = useState(INITIAL_ACCEL)
  const [reverse, setReverse] = useState(false)
  const modeSelector = useSelector(state => state.ros.controlMode)
  const vel_x = Math.round(useSelector(state => state.subscribers.odometry.velX)*10) / 10

  const incrementaAngleValues = 5
  const incrementAccelValues = 2

  const changeAccelROS = (newValue) => {
    ros.sendMessage(ACCELERATOR_TOPIC, "std_msgs/Int16", {
      data: newValue,
    })
    changeBrakeROS(false)
  }

  const changeBrakeROS = (isActivate) => {
    ros.sendMessage(BRAKE_TOPIC, "puma_brake_msgs/BrakeCmd", {
      activate_brake: isActivate,
    })
  }

  const changeDirectionROS = (newValue) => {
    ros.sendMessage(
      DIRECTION_TOPIC,
      "puma_direction_msgs/DirectionCmd",
      {
        activate: true,
        angle: newValue * DEG2RAD,
      }
    )
  }

  const changeReverseROS = (newValue) => {
    ros.sendMessage(REVERSE_TOPIC, "std_msgs/Bool", { data: newValue })
    ros.sendMessage("/puma/brake/command", "puma_brake_msgs/BrakeCmd", {
      activate_brake: true,
    })
  }

  const changeAccelValue = (up) =>  {
    let newValue
    if (!reverse) {
      if (up) {
        newValue = accelValue < LIMIT_ACCEL
            ? accelValue + incrementAccelValues
            : accelValue
      } else {
        newValue = accelValue > INITIAL_ACCEL
          ? accelValue - incrementAccelValues
          : accelValue
        setReverse(newValue <= INITIAL_ACCEL)
        changeReverseROS(newValue <= INITIAL_ACCEL)
      }
    } else {
      if (up) {
        newValue = accelValue > INITIAL_ACCEL
            ? accelValue - incrementAccelValues
            : accelValue
            changeReverseROS(newValue > INITIAL_ACCEL)
            setReverse(newValue > INITIAL_ACCEL)
        } else {
          newValue = accelValue < LIMIT_ACCEL
          ? accelValue + incrementAccelValues
          : accelValue
        }
      }
    setAccelValue(newValue)
    changeAccelROS(newValue)
  }

  const changeDirectionValue = (isRight) => {
    let newValue
    if (isRight) {
      newValue = angleDir > -LIMIT_ANGLE ? angleDir - incrementaAngleValues : angleDir
    } else {
      newValue = angleDir < LIMIT_ANGLE ? angleDir + incrementaAngleValues : angleDir
    }
    setAngleDir(newValue)
    changeDirectionROS(newValue)
  }


  const handleStop = () => {
    setAngleDir(0)
    changeDirectionROS(0)
    setReverse(false)
    setAccelValue(INITIAL_ACCEL)
    changeAccelROS(INITIAL_ACCEL)
    changeBrakeROS(true)
  }

  return (
    <Box className="control-manual">
      <Box className="control-manual__title">
        <Typography>
          <b>Control manual</b>
        
        </Typography>
      </Box>
      <Box className="control-manual__status">
        <Typography>
          <strong>Velocidad:</strong> {vel_x} m/s
        </Typography>
        <Typography>
          <strong>Dirección:</strong> {-angleDir} grados
        </Typography>
      </Box>
      <Box className="control-manual__buttons-grid">
        <IconButton
          disabled={modeSelector !== "manual"}
          className="control-manual__buttons-grid--up"
          onClick={() => changeAccelValue(true)}
        >
          <ArrowUpwardIcon className="control-manual__icons" />
        </IconButton>
        <IconButton
          disabled={modeSelector !== "manual"}
          className="control-manual__buttons-grid--down"
          onClick={() => changeAccelValue(false)}
        >
          <ArrowDownwardIcon className="control-manual__icons" />
        </IconButton>
        <IconButton
          disabled={modeSelector !== "manual"}
          className="control-manual__buttons-grid--reset"
          onClick={handleStop}
        >
          <BlockIcon className="control-manual__icons" />
        </IconButton>
        <IconButton
          disabled={modeSelector !== "manual"}
          className="control-manual__buttons-grid--left"
          onClick={() => changeDirectionValue(false)}
        >
          <TurnLeftIcon className="control-manual__icons" />
        </IconButton>
        <IconButton
          disabled={modeSelector !== "manual"}
          className="control-manual__buttons-grid--right"
          onClick={() => changeDirectionValue(true)}
        >
          <TurnRightIcon className="control-manual__icons" />
        </IconButton>
      </Box>
    </Box>
  )
}

ControlManual.propTypes = {}

export default ControlManual