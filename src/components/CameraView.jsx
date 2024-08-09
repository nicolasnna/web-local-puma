import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

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
    <Box display="flex" flexDirection="column" alignItems={"center"} justifyContent="center" width="100%" height="100%" padding={0}>
      {image ? (
        <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center" padding={0}>
          <img src={image} alt="Camera View" style={{ maxWidth: "100%" ,height: 'auto', maxHeight: '100%' }}/>
        </Box>
      ) : <Box display={"flex"} alignItems="center" justifyContent="center" sx={{width: '100%', height: '100%'}}>
        <Typography fontSize={'1.5em'}>Cámara sin conexión</Typography>
        </Box>}
    </Box>
  )
}

export default CameraView