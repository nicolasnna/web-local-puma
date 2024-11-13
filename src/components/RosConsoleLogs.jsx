import ContainerElement from "@components/ContainerElement"
import { Box } from "@mui/material"
import { useSelector } from "react-redux"

const RosConsoleLogs = () => {
  const { message, timeMessage } = useSelector((state) => state.ros)

  return (
    <ContainerElement
      Title={"Registros ROS"}
      currentDate={timeMessage}
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
