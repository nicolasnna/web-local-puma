import data from '@/db.json';
import {
  errorNotification,
  infoNotification,
} from '@reducer/notificationReducer';

const publisherInfo = data.topics.publishers;

const basePublishers = (
  ros,
  dispatch,
  infoTopic,
  message,
  successText,
  failedText = 'No se tiene conexión con el robot para enviar el comando.',
  desactivateNotification = false
) => {
  if (ros.isConnected) {
    ros.sendMessage(infoTopic.name, infoTopic.messageType, message);
    if (!desactivateNotification) dispatch(infoNotification(successText));
    return true;
  }
  if (!desactivateNotification) dispatch(errorNotification(failedText));
  return false;
};

export const publishModeControler = (ros, dispatch, mode) => {
  const { mode_selector } = publisherInfo;
  return basePublishers(
    ros,
    dispatch,
    mode_selector,
    { data: mode },
    `Se ha enviado el cambio de modo ${mode} al robot.`,
    'No se tiene conexión con el robot para realizar el cambio.'
  );
};

export const publishGpsGoals = (ros, dispatch, gpsArray) => {
  const { send_gps } = publisherInfo.waypoints;
  return basePublishers(
    ros,
    dispatch,
    send_gps,
    { data: gpsArray },
    'Se ha enviado los waypoints gps al robot.',
    'No se tiene conexión con el robot para enviar la ruta.'
  );
};

export const publishReadyPlan = (ros, dispatch) => {
  const { plan_ready } = publisherInfo.waypoints;
  return basePublishers(
    ros,
    dispatch,
    plan_ready,
    {},
    'Se ha enviado el comando para empezar el plan.'
  );
};

export const publishStopPlan = (ros, dispatch) => {
  const { plan_stop } = publisherInfo.waypoints;
  return basePublishers(
    ros,
    dispatch,
    plan_stop,
    {},
    'Se ha enviado el comando para detenerse.'
  );
};

export const publishResetPlan = (ros, dispatch) => {
  const { plan_reset } = publisherInfo.waypoints;
  return basePublishers(
    ros,
    dispatch,
    plan_reset,
    {},
    'Se ha enviado el comando para limpiar los waypoints del robot.'
  );
};

export const publishTeleop = (ros, dispatch, accel, direction_angle, brake, reverse) => {
  const { web_teleop } = publisherInfo
  return basePublishers(
    ros,
    dispatch,
    web_teleop,
    {
      accel_value: accel,
      angle_degree: direction_angle,
      brake: brake,
      reverse: reverse
    },
    'Se ha enviado el comando',
    'No se ha podido enviar el comando',
    true
  )
}
