import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import BlockIcon from '@mui/icons-material/Block';
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import { Box, IconButton, Typography } from '@mui/material';
import { publishAcceleratorCmd, publishBrakeCmd, publishDirectionCmd, publishReverseCmd } from '@services/rosPublishers';
import { RosContext } from '@utils/RosProvider';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import data from '@/db.json'

const {initial_accel, limit_angle, limit_accel} = data.params

const ControlManual = () => {
  const ros = useContext(RosContext)
  const [angleDir, setAngleDir] = useState(0)
  const [accelValue, setAccelValue] = useState(initial_accel)
  const [reverse, setReverse] = useState(false)
  const dispatch = useDispatch()
  const modeSelector = useSelector(state => state.ros.controlMode)
  const vel_x = Math.round(useSelector(state => state.subscribers.odometry.velX)*10) / 10

  const incrementaAngleValues = 5
  const incrementAccelValues = 2

  const changeReverseROS = (newValue) => {
    publishReverseCmd(ros, dispatch, newValue)
    publishBrakeCmd(ros, dispatch, true)
  }

  const changeAccelValue = (up) =>  {
    let newValue
    if (!reverse) {
      if (up) {
        newValue = accelValue < limit_accel
            ? accelValue + incrementAccelValues
            : accelValue
      } else {
        newValue = accelValue > initial_accel
          ? accelValue - incrementAccelValues
          : accelValue
        setReverse(newValue <= initial_accel)
        changeReverseROS(newValue <= initial_accel)
      }
    } else {
      if (up) {
        newValue = accelValue > initial_accel
            ? accelValue - incrementAccelValues
            : accelValue
            changeReverseROS(newValue > initial_accel)
            setReverse(newValue > initial_accel)
        } else {
          newValue = accelValue < limit_accel
          ? accelValue + incrementAccelValues
          : accelValue
        }
      }
      setAccelValue(newValue)

    dispatch((dispatch) => {
      publishBrakeCmd(ros, dispatch, false)
      publishAcceleratorCmd(ros, dispatch, newValue)
    })
  }

  const changeDirectionValue = (isRight) => {
    let newValue
    if (isRight) {
      newValue = angleDir > -limit_angle ? angleDir - incrementaAngleValues : angleDir
    } else {
      newValue = angleDir < limit_angle ? angleDir + incrementaAngleValues : angleDir
    }
    setAngleDir(newValue)
    publishDirectionCmd(ros, dispatch, true ,newValue)
  }


  const handleStop = () => {
    setAngleDir(0)
    setReverse(false)
    setAccelValue(initial_accel)
    publishDirectionCmd(ros, dispatch, true, 0)
    publishAcceleratorCmd(ros, dispatch, initial_accel)
    publishBrakeCmd(ros, dispatch, true)
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