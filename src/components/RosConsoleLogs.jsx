import { Box } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessage } from "../reducer/rosReducer"
import '../styles/components/_RosConsoleLogs.sass'
import { ROSLOG_TOPIC } from "../utils/constants"

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
    dispatch(setMessage(`${message.header.stamp.secs}.${message.header.stamp.nsecs} [${message.level}] ${message.name}: ${message.msg}`))
  }

  return (
    <Box className="console-log" >
      {logs.map((m,index) => <p key={`message ${index}`} className="console-log__text">
        {m}
      </p>)}
    </Box>
  )
}

export default RosConsoleLogs