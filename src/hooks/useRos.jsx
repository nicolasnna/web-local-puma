import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ROSLIB from 'roslib';
import { setConnection } from '@reducer/rosReducer';

const useRos = () => {
  const [ros, setRos] = useState(null);
  const url = useSelector((state) => state.ros.url);
  const dispatch = useDispatch();
  const [subscribers, setSubscribers] = useState({});

  const openConnection = () => {
    if (ros) return;

    const createRos = new ROSLIB.Ros({ url });

    createRos.on('connection', () => {
      console.log('Conectado con websocket server.');
      dispatch(setConnection(true));
    });

    createRos.on('error', (error) => {
      console.log('Error al conectar con websocket server: ', error);
      dispatch(setConnection(false));
    });

    createRos.on('close', () => {
      console.log('Conección con websocket server cerrada.');
      dispatch(setConnection(false));
      setRos(null);
    });

    setRos(createRos);
  };

  const closeConnection = () => {
    if (ros) {
      const instanceRos = ros;
      instanceRos.close();
      setRos(null);
      console.log('Connection closed manually.');
    }
  };

  const sendMessage = (name, messageType, message) => {
    const rosTopic = new ROSLIB.Topic({ ros, name, messageType });

    const rosMessage = new ROSLIB.Message(message);
    rosTopic.publish(rosMessage);
  };

  const subscribe = (name, messageType, callback) => {
    if (!ros || subscribers[name]) return;

    const rosTopic = new ROSLIB.Topic({ ros, name, messageType });
    rosTopic.subscribe((msg) => callback(msg, dispatch));

    setSubscribers((prev) => ({ ...prev, [name]: rosTopic }));
  };

  const unsubscribe = (topic) => {
    if (subscribers[topic]) {
      subscribers[topic].unsubscribe();
      setSubscribers((prev) => {
        const newSubscribers = { ...prev };
        delete newSubscribers[topic];
        return newSubscribers;
      });
    }
  };

  /* Reconectar al cambiar url */
  useEffect(() => {
    openConnection();
    return () => closeConnection();
  }, [url]); // eslint-disable-line

  return {
    ros,
    subscribers,
    openConnection,
    closeConnection,
    subscribe,
    unsubscribe,
    sendMessage,
  };
};

export default useRos;
