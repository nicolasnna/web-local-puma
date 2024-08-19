import { Box } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessage } from "../../../reducer/rosReducer"
import { ROSLOG_TOPIC } from "../../../utils/constants"
import ContainerElement from '../../../components/ContainerElement'
import PropTypes from 'prop-types'

const RosConsoleLogs = ({rosInstance}) => {
  const logs = useSelector(state => state.ros.message)
  const isConnectedRos = useSelector(state => state.ros.isConnected)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isConnectedRos) { 
      rosInstance.subscribe(ROSLOG_TOPIC, 'rosgraph_msgs/Log', handlelogs)
    }
  },[isConnectedRos])

  const handlelogs = (message) => {
    const newDate = new Date
    const formattedDate = `${newDate.getDate().toString().padStart(2, '0')}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${newDate.getFullYear()}`;
    const formattedTime = `${newDate.getHours().toString().padStart(2, '0')}:${newDate.getMinutes().toString().padStart(2, '0')}:${newDate.getSeconds().toString().padStart(2, '0')}`;
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    dispatch(setMessage(`${formattedDateTime} [${message.level}] ${message.name}: ${message.msg}`))
  }

  return (
    <ContainerElement
      Title={"Registros ROS"}
      Topic={ROSLOG_TOPIC}
    >
      <Box className="console-log" >
        {logs.map((m,index) => <p key={`message ${index}`} className="console-log__text">
          {m}
        </p>)}
      </Box>
    </ContainerElement>
  )
}

RosConsoleLogs.propTypes = {
  rosInstance: PropTypes.object
}

export default RosConsoleLogs