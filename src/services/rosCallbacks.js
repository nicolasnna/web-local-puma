import { pushRosValue, setRosValue } from '@reducer/rosReducer';
import { pushTopicKeyValue, setTopicValues } from '@reducer/subscribersReducer';
import { setWaypointsKeyValue } from '@reducer/waypointsReducer';
import { getCurrentTime, getYawDegreeFomQuaternions } from '@utils/utils';

export const callbackCamera = (message, dispatch) => {
  const image = `data:image/jpeg;base64,${message.data}`;
  const time = getCurrentTime();

  dispatch(setTopicValues('camera', { image, time }));
};

export const callbackGps = (message, dispatch) => {
  const { latitude, longitude } = message;
  const time = getCurrentTime();
  dispatch(setTopicValues('gps', { latitude, longitude, time }));
  dispatch(pushTopicKeyValue('gps', 'pathNav', { latitude, longitude }));
};

export const callbackLogs = (message, dispatch) => {
  const messageTime = getCurrentTime();
  const arrayLogs = message.logs
  const allMessages = arrayLogs.map(l => `${l.date_text} [${l.level}] ${l.node}: ${l.content}`)

  dispatch(setRosValue('timeMessage', messageTime));
  // dispatch(pushRosValue('message', messageLog));
  dispatch(setRosValue('message', allMessages))
};

export const callbackModePuma = (message, dispatch) => {
  dispatch(setRosValue('controlMode', message.data));
};

export const callbackOdometry = (message, dispatch) => {
  const velX = message.twist.twist.linear.x;
  const quaternion = message.pose.pose.orientation;
  const yaw = getYawDegreeFomQuaternions(quaternion);
  const time = getCurrentTime();
  dispatch(setTopicValues('odometry', { velX, yaw, time }));
};

export const callbackStateWaypoints = (message, dispatch) => {
  const { active_states } = message;
  if (Array.isArray(active_states)) {
    dispatch(setWaypointsKeyValue('robot', 'state', active_states[0]));
  }
};

export const callbackGpsNavInfo = (message, dispatch) => {
  const { index_from, start, next_goal, goals } = message;
  let KeysValues = [
    {
      key: 'originGps',
      value: { ...start },
    },
    { key: 'currentIndex', value: index_from },
    { key: 'setNextGoal', value: {...next_goal} },
  ];
  let labelWaypoints = ['Inicio'];
  let valuesWaypoints = [
    { ...start },
  ];
  const goalsArray = goals.map((g) => {
    return { ...g };
  });
  if (index_from === 0) {
    labelWaypoints = [
      ...labelWaypoints,
      ...goalsArray.map((g, i) => `Planeado ${i + 1}`),
    ];
    valuesWaypoints = [...valuesWaypoints, ...goalsArray];
    KeysValues.push({ key: 'pathPlanned', value: goalsArray });
  } else {
    let goalsArrayCopy = goalsArray;
    const completed = goalsArrayCopy.splice(0, index_from);
    labelWaypoints = [
      ...labelWaypoints,
      ...completed.map((g, i) => `Completado ${i + 1}`),
      ...goalsArray.map((g, i) => `Planeado ${i + 1}`),
    ];
    valuesWaypoints = [...valuesWaypoints, ...completed, ...goalsArray];
    KeysValues.push({ key: 'pathPlanned', value: goalsArrayCopy });
    KeysValues.push({ key: 'pathCompleted', value: completed });
  }
  const waypoints = valuesWaypoints.map((w, index) => {
    return { ...w, label: labelWaypoints[index] };
  });
  KeysValues.push({ key: 'waypoints', value: waypoints });
  KeysValues.map((e) => dispatch(setWaypointsKeyValue('robot', e.key, e.value)));
};
