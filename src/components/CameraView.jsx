import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ContainerElement from "@components/ContainerElement"
import PropTypes from "prop-types"
import { REALSENSE_TOPIC } from "@utils/constants"
import useCurrentTime from "@hooks/useCurrentTime"

const CameraView = ({ rosInstance, extraClassName }) => {
  const [image, setImage] = useState("")
  const isConnected = useSelector((state) => state.ros.isConnected)
  const currentTime = useCurrentTime()

  useEffect(() => {
    if (isConnected) {
      rosInstance.subscribe(
        REALSENSE_TOPIC,
        "sensor_msgs/CompressedImage",
        callbackCamera
      )
    }
  }, [isConnected])

  const callbackCamera = (message) => {
    setImage(`data:image/jpeg;base64,${message.data}`)
    currentTime.getCurrentTime()
  }

  return (
    <ContainerElement
      Title={"Vista Realsense"}
      Topic={REALSENSE_TOPIC}
      currentDate={currentTime.value}
      extraClassName={extraClassName}
    >
      <Box className="camera-view">
        {image ? (
          <img src={image} alt="Camera View" className="camera-view__img" />
        ) : (
          <Box className="camera-view__no-img">
            <Typography>Cámara sin conexión</Typography>
          </Box>
        )}
      </Box>
    </ContainerElement>
  )
}

CameraView.propTypes = {
  rosInstance: PropTypes.object,
  extraClassName: PropTypes.string,
}

export default CameraView
