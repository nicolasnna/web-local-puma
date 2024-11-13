import ContainerElement from "@components/ContainerElement"
import { Box, Typography } from "@mui/material"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"

const CameraView = ({ extraClassName }) => {
  const {image, time} = useSelector(state => state.subscribers.camera)

  return (
    <ContainerElement
      Title={"Vista Realsense"}
      Topic={"/compressed"}
      currentDate={time}
      extraClassName={extraClassName}
    >
      <Box className="camera-view">
        {image !== '' ? (
          <img src={image} alt="Camera Realsense View" className="camera-view__img" />
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
  extraClassName: PropTypes.string,
}

export default CameraView
