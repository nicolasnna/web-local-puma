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
  failedText = 'No se tiene conexión con el robot para enviar el comando.'
) => {
  if (ros.isConnected) {
    ros.sendMessage(infoTopic.name, infoTopic.messageType, message);
    dispatch(infoNotification(successText));
    return true;
  }
  dispatch(errorNotification(failedText));
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

export const publishAcceleratorCmd = (ros, dispatch, value) => {
  const { accelerator } = publisherInfo;
  return basePublishers(
    ros,
    dispatch,
    accelerator,
    { data: value },
    `Se ha enviado el valor ${value} para el acelerador.`
  );
};

export const publishBrakeCmd = (ros, dispatch, toActivate) => {
  const { brake } = publisherInfo;
  return basePublishers(
    ros,
    dispatch,
    brake,
    { activate_brake: toActivate },
    `Se ha enviado el comando '${
      toActivate ? 'ACTIVAR' : 'DESACTIVAR'
    }' para los frenos.`
  );
};

export const publishDirectionCmd = (ros, dispatch, toActivate, angleDegres) => {
  const { direction } = publisherInfo;
  return basePublishers(
    ros,
    dispatch,
    direction,
    { activate: toActivate, angle: (angleDegres * Math.PI) / 180 },
    `Se ha enviado el comando para mover la dirección a un ángulo de ${-angleDegres}°.`
  );
};

export const publishReverseCmd = (ros, dispatch, toActivate) => {
  const { reverse } = publisherInfo;
  return basePublishers(
    ros,
    dispatch,
    reverse,
    { data: toActivate },
    `Se ha enviado el comando '${
      toActivate ? 'ACTIVAR' : 'DESACTIVAR'
    }' para la reversa.`
  );
};
