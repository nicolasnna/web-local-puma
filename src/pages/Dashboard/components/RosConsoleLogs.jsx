import ContainerElement from "@components/ContainerElement"
import { Box } from "@mui/material"
import { ROSLOG_TOPIC } from "@utils/constants"
import { useSelector } from "react-redux"

const RosConsoleLogs = () => {
  const { message, timeUploaded } = useSelector((state) => state.ros)

  return (
    <ContainerElement
      Title={"Registros ROS"}
      Topic={ROSLOG_TOPIC}
      currentDate={timeUploaded}
    >
      <Box className="console-log">
        {message.map((m, index) => (
          <p key={`message ${index}`} className="console-log__text">
            {m}
          </p>
        ))}
      </Box>
    </ContainerElement>
  )
}

RosConsoleLogs.propTypes = {}

export default RosConsoleLogs
