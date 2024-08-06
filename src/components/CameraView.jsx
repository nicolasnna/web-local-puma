import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FontSize } from "../utils/constants"

const CameraView = ({rosInstance}) => {
  const [image, setImage] = useState('')
  const isConnected = useSelector(state => state.ros.isConnected)

  useEffect(()=> {
    if (isConnected) {
      rosInstance.subscribe('/camera/color/image_raw/compressed','sensor_msgs/CompressedImage',callbackCamera) 
    }
  }, [isConnected])

  const callbackCamera = (message) => {
    setImage(`data:image/jpeg;base64,${message.data}`)
  }

  return (
    <Box display="flex" flexDirection="column" alignItems={"center"} justifyContent="center" gap={2}>
      {image ? (
        <img src={image} alt="Camera View" style={{ width: '600px', height: '480px' }} />
      ) : <Box display={"flex"} alignItems="center" justifyContent="center" sx={{width: '600px', height: '480px'}}>
        <Typography fontSize={FontSize.HIGH}>Cámara sin conexión</Typography>
        </Box>}
    </Box>
  )
}

export default CameraView