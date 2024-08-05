import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import { FontSize } from "../utils/constants"

const CameraView = ({rosInstance}) => {
  const [image, setImage] = useState('')

  const openCamera = () => {
    rosInstance.subscribe('/camera/color/image_raw/compressed','sensor_msgs/CompressedImage',callbackCamera)
  }

  const callbackCamera = (message) => {
    setImage(`data:image/jpeg;base64,${message.data}`)
  }

  return (
    <Box>
      <Typography fontSize={FontSize.HIGH}>Camera view</Typography>
      <Button variant={"contained"} onClick={openCamera}>conectar camara</Button>
      {image ? (
        <img src={image} alt="Camera View" style={{ width: '100%', height: 'auto' }} />
      ) : <Typography fontSize={FontSize.HIGH}>Camera no disponible</Typography>}
    </Box>
  )
}

export default CameraView