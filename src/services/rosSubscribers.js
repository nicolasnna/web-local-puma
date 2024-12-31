import {
  callbackArduinoMega,
  callbackCamera,
  callbackGps,
  callbackGpsNavInfo,
  callbackLogs,
  callbackModePuma,
  callbackOdometry,
  callbackStateWaypoints,
} from '@services/rosCallbacks';
import data from '@/db.json';

const topics = data.topics.subscribers;

export const rosSubscribers = (ros) => {
  ros.subscribe(
    topics.realsense.name,
    topics.realsense.messageType,
    callbackCamera
  );
  ros.subscribe(topics.gps.name, topics.gps.messageType, callbackGps);
  ros.subscribe(
    topics.pumalogs.name,
    topics.pumalogs.messageType,
    callbackLogs
  );
  ros.subscribe(
    topics.odometry.name,
    topics.odometry.messageType,
    callbackOdometry
  );
  ros.subscribe(
    topics.current_control_mode.name,
    topics.current_control_mode.messageType,
    callbackModePuma
  );
  ros.subscribe(
    topics.waypoints_current_mode.name,
    topics.waypoints_current_mode.messageType,
    callbackStateWaypoints
  );
  ros.subscribe(
    topics.waypoints_gps_info.name,
    topics.waypoints_gps_info.messageType,
    callbackGpsNavInfo
  );
  ros.subscribe(
    topics.arduinomega.name,
    topics.arduinomega.messageType,
    callbackArduinoMega
  );
};
