import CameraView from '@components/CameraView';
import RobotControl from '@components/Control/RobotControl';
import Header from '@components/Header';
import { MapAutonomous } from '@components/Map';
import Notification from '@components/Notification';
import RosConsoleLogs from '@components/RosConsoleLogs';
import TableWaypointList from '@components/TableWaypointList';
import { Box } from '@mui/material';
import { rosSubscribers } from '@services/rosSubscribers';
import { RosContext } from '@utils/RosProvider';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const ros = useContext(RosContext);
  const isConnected = useSelector((state) => state.ros.isConnected);
  const waypointsWeb = useSelector((state) => state.waypoints.web.waypoints);
  const waypointsRobot = useSelector(state => state.waypoints.robot.waypoints)

  useEffect(() => {
    if (isConnected) {
      rosSubscribers(ros)
    }
  }, [isConnected]); // eslint-disable-line

  return (
    <>
      <Notification />
      <Box className="dashboard">
        <Box className="dashboard__row">
          <Box className="dashboard__side" height={'100%'}>
            <Header title="Panel de control Robot Seguridad PUMA" />
            <MapAutonomous widthMap="800px" heightMap="500px" />
          </Box>
          <Box className="dashboard__side">
            <RobotControl />
            <CameraView />
          </Box>
        </Box>
        <Box className="dashboard__row">
          <TableWaypointList
            title="Destinos creados en mapa"
            waypoints={waypointsWeb}
            keyChangePosition='web'
          />
          <TableWaypointList
            title="Destinos subidos en robot"
            waypoints={waypointsRobot}
          />
          <RosConsoleLogs />
        </Box>
      </Box>
    </>
  );
}

export default App;
