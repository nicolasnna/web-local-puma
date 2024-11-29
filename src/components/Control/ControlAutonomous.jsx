import { Box, Button, Typography } from '@mui/material';
import {
  publishGpsGoals,
  publishReadyPlan,
  publishResetPlan,
  publishStopPlan,
} from '@services/rosPublishers';
import { RosContext } from '@utils/RosProvider';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ControlAutonomous = () => {
  const ros = useContext(RosContext);
  const dispatch = useDispatch();
  const { state, currentIndex } = useSelector((state) => state.waypoints.robot);
  const { waypoints } = useSelector((state) => state.waypoints.web);
  const arrayGpsPosition = useSelector(
    (state) => state.waypoints.web.waypoints
  );

  const handleSendGoalGps = () => {
    const msgGps = arrayGpsPosition.map((p) => {
      return { latitude: p.latitude, longitude: p.longitude };
    });
    publishGpsGoals(ros, dispatch, msgGps);
  };

  const handleStart = () => {
    publishReadyPlan(ros, dispatch);
  };

  const handleStop = () => {
    publishStopPlan(ros, dispatch);
  };

  const handleResetPath = () => {
    publishResetPlan(ros, dispatch);
  };

  const buttonsList = [
    { key: 'start-button', label: 'Empezar', click: handleStart },
    { key: 'stop-button', label: 'Parar', click: handleStop },
    { key: 'reset-button', label: 'Limpiar plan', click: handleResetPath },
    {
      key: 'upload-wpts-button',
      label: 'Subir waypoints',
      click: handleSendGoalGps,
    },
  ];

  return (
    <Box className="control-autonomous">
      <Box className="control-autonomous__title">
        <Typography>
          <b>Control autónomo</b>
        </Typography>
      </Box>
      <Box className="control-autonomous__state">
        <Typography>
          <b>Estado actual:</b>
        </Typography>
        <Typography>{state}</Typography>
      </Box>
      {state === 'PATH_FOLLOW' && <Box className="control-autonomous__state">
        <Typography>
          {currentIndex == 0 ? 'Inicial' : waypoints[currentIndex-1].label}
        </Typography>
        <div className="control-autonomous__group-icon">
          <ArrowForwardIosIcon sx={{ height: '20px', alignSelf: 'center'}}/>
          <ArrowForwardIosIcon sx={{ height: '20px', alignSelf: 'center'}}/>
          <ArrowForwardIosIcon sx={{ height: '20px', alignSelf: 'center'}}/>
        </div>
        <Typography>
          {currentIndex < waypoints.length-1 ? waypoints[currentIndex].label : 'Destino Final'}
        </Typography>
      </Box>}
      <Box className="control-autonomous__buttons-group">
        {buttonsList.map((b, index) => (
          <Button
            className="button--primary"
            key={b.key || index}
            onClick={b.click}
          >
            {b.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

ControlAutonomous.propTypes = {};

export default ControlAutonomous;
