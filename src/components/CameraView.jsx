import ContainerElement from "@components/ContainerElement"
import { Box, Typography } from "@mui/material"
import { REALSENSE_TOPIC } from "@utils/constants"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"

const CameraView = ({ extraClassName }) => {
  const currentTime = useSelector((state) => state.cameraRos.timeUploaded)
  const image = useSelector((state) => state.cameraRos.image)

  return (
    <ContainerElement
      Title={"Vista Realsense"}
      Topic={"/compressed"}
      currentDate={currentTime}
      extraClassName={extraClassName}
    >
      <Box className="camera-view">
        {image ? (
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
