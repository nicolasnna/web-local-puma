import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import TurnRightIcon from '@mui/icons-material/TurnRight';
import { Box, IconButton, Switch, Typography } from '@mui/material';
import { publishTeleop } from '@services/rosPublishers';
import { RosContext } from '@utils/RosProvider';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import data from '@/db.json';

const { initial_accel, limit_angle, limit_accel } = data.params;

const ControlManual = () => {
  const [angleDir, setAngleDir] = useState(0);
  const [accelValue, setAccelValue] = useState(initial_accel);
  const [reverse, setReverse] = useState(false);
  const [brake, setBrake] = useState(false);
  const ros = useContext(RosContext);
  const dispatch = useDispatch();
  const modeSelector = useSelector((state) => state.ros.controlMode);
  const velX =
    Math.round(useSelector((state) => state.subscribers.odometry.velX) * 10) /
    10;

  const incrementaAngleValues = 5;
  const incrementAccelValues = 2;

  useEffect(() => {
    if (modeSelector === 'web') {
      const interval = setInterval(() => {
        publishTeleop(ros, dispatch, accelValue, angleDir, brake, reverse);
      }, 300); // Publicar cada 100 ms

      return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte o cambie el modo
    }
  }, [ros, angleDir, accelValue, reverse, brake, modeSelector]); //eslint-disable-line

  const changeAccelValue = (up) => {
    if (!brake) {
      let newValue;
      if (up) {
        newValue =
          accelValue < limit_accel
            ? accelValue + incrementAccelValues
            : accelValue;
      } else {
        newValue =
          accelValue > initial_accel
            ? accelValue - incrementAccelValues
            : accelValue;
      }
      setAccelValue(newValue);
    }
  };

  const changeDirectionValue = (isRight) => {
    if (!brake) {
      let newValue;
      if (isRight) {
        newValue =
          angleDir > -limit_angle ? angleDir - incrementaAngleValues : angleDir;
      } else {
        newValue =
          angleDir < limit_angle ? angleDir + incrementaAngleValues : angleDir;
      }
      setAngleDir(newValue);
    }
  };

  const handleStop = (e) => {
    setBrake(e.target.checked);
    if (e.target.checked) {
      setAngleDir(0);
      setReverse(false);
      setAccelValue(initial_accel);
    }
  };

  return (
    <Box className="control-manual">
      <Box className="control-manual__title">
        <Typography>
          <b>Control manual</b>
        </Typography>
      </Box>
      <Box className="control-manual__status">
        <Typography>
          <strong>Velocidad:</strong> {velX} m/s
        </Typography>
        <Typography>
          <strong>Dirección:</strong> {-angleDir} grados
        </Typography>
      </Box>
      <div style={{ padding: '0.5rem' }}>
        <div className="control-manual__switch-options">
          <div className="control-manual__switch-options__content">
            <Typography>
              <strong>Habilitar freno</strong>
            </Typography>
            <Switch checked={brake} onChange={handleStop} />
          </div>
          <div className="control-manual__switch-options__content">
            <Typography>
              <strong>Habilitar reversa</strong>
            </Typography>
            <Switch
              checked={reverse}
              onChange={(e) => setReverse(e.target.checked)}
            />
          </div>
        </div>

        <Box className="control-manual__buttons-grid">
          <IconButton
            disabled={modeSelector !== 'web'}
            className="control-manual__buttons-grid--up"
            onClick={() => changeAccelValue(true)}
          >
            <ArrowUpwardIcon className="control-manual__icons" />
          </IconButton>
          <IconButton
            disabled={modeSelector !== 'web'}
            className="control-manual__buttons-grid--down"
            onClick={() => changeAccelValue(false)}
          >
            <ArrowDownwardIcon className="control-manual__icons" />
          </IconButton>
          <IconButton
            disabled={modeSelector !== 'web'}
            className="control-manual__buttons-grid--left"
            onClick={() => changeDirectionValue(false)}
          >
            <TurnLeftIcon className="control-manual__icons" />
          </IconButton>
          <IconButton
            disabled={modeSelector !== 'web'}
            className="control-manual__buttons-grid--right"
            onClick={() => changeDirectionValue(true)}
          >
            <TurnRightIcon className="control-manual__icons" />
          </IconButton>
        </Box>
      </div>
    </Box>
  );
};

ControlManual.propTypes = {};

export default ControlManual;
