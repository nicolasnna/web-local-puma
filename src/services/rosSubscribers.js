import {
  callbackCamera,
  callbackGps,
  callbackGpsNavInfo,
  callbackLogs,
  callbackModePuma,
  callbackOdometry,
  callbackStateWaypoints,
} from '@services/rosCallbacks';
import data from '../db.json';

export const rosSubscribers = (ros) => {
  ros.subscribe(
    data.topics.realsense.name,
    data.topics.realsense.messageType,
    callbackCamera
  );

  ros.subscribe(
    data.topics.gps.name,
    data.topics.gps.messageType,
    callbackGps
  );
  // Console logs
  ros.subscribe(
    data.topics.roslog.name,
    data.topics.roslog.messageType,
    callbackLogs
  );
  ros.subscribe(
    data.topics.odometry.name,
    data.topics.odometry.messageType,
    callbackOdometry
  );
  ros.subscribe(
    data.topics.current_control_mode.name,
    data.topics.current_control_mode.messageType,
    callbackModePuma
  );
  // Maquina de estados
  ros.subscribe(
    data.topics.waypoints_current_mode.name,
    data.topics.waypoints_current_mode.messageType,
    callbackStateWaypoints
  );
  ros.subscribe(
    data.topics.waypoints_gps_info.name,
    data.topics.waypoints_gps_info.messageType,
    callbackGpsNavInfo
  );
}