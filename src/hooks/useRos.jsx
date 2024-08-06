import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ROSLIB from "roslib"
import { setConnection } from "../reducer/rosReducer"

const useRos = () => {
  const [ros, setRos] = useState(null)
  const url = useSelector(state => state.ros.rosUrl)
  const dispatch = useDispatch()
  const [subscribers, setSubscribers] = useState([])

  const openConnection = () => {
    const createRos = new ROSLIB.Ros({
      url: url,
    })

    createRos.on('connection', () => {
      console.log('Connected to websocket server.');
      dispatch(setConnection(true));
    });

    createRos.on('error', (error) => {
      console.log('Error connecting to websocket server: ', error);
      dispatch(setConnection(false));
    });

    createRos.on('close', () => {
      console.log('Connection to websocket server closed.');
      dispatch(setConnection(false));
    });

    setRos(createRos)
  }

  const closeConnection = () => {
    if (ros) {
      const instanceRos = ros
      instanceRos.close()
      setRos(null)
      console.log('Connection closed manually.')
    }
  }

  const sendMessage = (topic, messageType, message) => {
    const rosTopic = new ROSLIB.Topic({
      ros: this.ros,
      name: topic,
      messageType: messageType
    });

    const rosMessage = new ROSLIB.Message(message);
    rosTopic.publish(rosMessage);
  }

  const subscribe = (topic, messageType, callback) => {
    if (subscribers.find(t => t.name === topic)) {
      const actualSubscribe = subscribers.filter(t => t.name === topic)[0]
      actualSubscribe.unsubscribe();
    }

    const rosTopic = new ROSLIB.Topic({
      ros: ros,
      name: topic,
      messageType: messageType
    });

    rosTopic.subscribe(callback);
    setSubscribers([...subscribers,rosTopic]);
  }

  const unsubscribe = (topic) => {
    if (subscribers.find(t => t.name === topic)) {
      const actualSubscribe = subscribers.filter(t => t.name === topic)[0]
      actualSubscribe.unsubscribe();
    }
  }

  return {
    ros,
    subscribers,
    openConnection,
    closeConnection,
    subscribe,
    unsubscribe
  }
}

export default useRos