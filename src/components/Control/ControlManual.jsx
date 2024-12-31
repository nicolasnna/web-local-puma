import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SignalCellularAlt1Bar from '@mui/icons-material/SignalCellularAlt1Bar';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CompassCalibrationIcon from '@mui/icons-material/CompassCalibration';
import { Box, IconButton, Switch, Typography, Slider } from '@mui/material';
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
  const [brake, setBrake] = useState(true);
  const [parking, setParking] = useState(true);
  const [levelAccel, setLevelAccel] = useState(0);
  const ros = useContext(RosContext);
  const dispatch = useDispatch();
  const modeSelector = useSelector((state) => state.ros.controlMode);
  const secureStop = useSelector((state) => state.subscribers.arduino.secureStop);
  const velX = Math.round(useSelector((state) => state.subscribers.odometry.velX) * 10) / 10;
  const maxLevelAccelerator = 5;

  useEffect(() => {
    if (modeSelector === 'web') {
      const interval = setInterval(() => {
        if (secureStop) {
          setBrake(true);
          setParking(true);
          setAngleDir(0);
          setReverse(false);
          setAccelValue(initial_accel);
        }
        publishTeleop(ros, dispatch, accelValue, -angleDir, brake, reverse, parking);
      }, 300); // Publicar cada 300 ms

      return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte o cambie el modo
    }
  }, [ros, angleDir, accelValue, reverse, brake, parking, modeSelector, secureStop]); //eslint-disable-line

  const handleChangeDirection = (e, value) => {
    if (!brake) {
      setAngleDir(value);
    }
  };

  const handleChangeAccelerator = (e, value) => {
    if (!brake) {
      if (value === 0) {
        setAccelValue(initial_accel);
        setBrake(true);
      } else {
        setAccelValue(value + limit_accel - maxLevelAccelerator);
      }
      setLevelAccel(value);
    }
    console.log(accelValue);
  };

  const handleStop = (e) => {
    setBrake(e.target.checked);
    setParking(e.target.checked);
    if (e.target.checked) {
      setReverse(false);
      setAccelValue(initial_accel);
      setLevelAccel(0);
    }
  };


  return (
    <Box className="control-manual">
      <Box className="control-manual__title">
        <Typography>
          <b>Control manual</b>
        </Typography>
      </Box>
      <div className="control-manual__switch-options">
        <div className="control-manual__switch-options__content">
          <Typography>Habilitar freno</Typography>
          <Switch checked={brake} onChange={handleStop} />
        </div>
        <div className="control-manual__switch-options__content">
          <Typography>Habilitar reversa</Typography>
          <Switch
            defaultValue={true}
            checked={reverse}
            onChange={(e) => setReverse(e.target.checked)}
          />
        </div>
      </div>

      <div className="control-manual__direction">
        <div className="control-manual__direction__info">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40',
              height: '40',
              backgroundColor: '#e0e0e1',
              borderRadius: '50%',
              border: '1px solid #ccc',
              padding: '5px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
            }}
          >
            <CompassCalibrationIcon
              sx={{
                color: modeSelector !== 'web' ? 'grey' : '#061941',
                transform: `rotate(${angleDir}deg)`,
                fontSize: '30px',
              }}
            />
          </Box>
          <Typography align="center">
            <strong>Dirección:</strong> {angleDir}°
          </Typography>
          <IconButton onClick={() => setAngleDir(0)}>
            <RestartAltIcon
              sx={{
                fontSize: '30px',
                color: '#061941',
              }}
            />
          </IconButton>
        </div>
        <div className="control-manual__direction__slider">
          <Typography>-{limit_angle}</Typography>
          <Slider
            size="medium"
            valueLabelDisplay="auto"
            aria-label="direction_manual"
            value={angleDir}
            step={4}
            min={-limit_angle}
            max={limit_angle}
            onChange={handleChangeDirection}
            disabled={modeSelector !== 'web'}
            track={false}
            sx={{
              height: 10,
              '& .MuiSlider-thumb': {
                width: 24,
                height: 24,
              },
              '& .MuiSlider-rail': {
                background: ' linear-gradient(to right,  #FF0000, #42a5f5, #FF0000)',
              },
            }}
          />
          <Typography>{limit_angle}</Typography>
        </div>
      </div>

      <div className="control-manual__accelerator">
        <div className="control-manual__accelerator__info">
          <Typography>
            <strong>Velocidad:</strong> {velX} m/s
          </Typography>
        </div>
        <div className="control-manual__accelerator__slider">
          <Typography>Parar</Typography>
          <Slider
            aria-label="accelerator_manual"
            value={levelAccel}
            onChange={handleChangeAccelerator}
            disabled={modeSelector !== 'web'}
            min={0}
            max={maxLevelAccelerator}
            sx={{
              height: 10,
              '& .MuiSlider-thumb': {
                width: 24,
                height: 24,
              },
              '& .MuiSlider-rail': {
                background: 'linear-gradient(to right, #42a5f5, #f44336)',
              },
            }}
          />
          <Typography>Acelerar</Typography>
        </div>
      </div>
    </Box>
  );
};

ControlManual.propTypes = {};

export default ControlManual;
