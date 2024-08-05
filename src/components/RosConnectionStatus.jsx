import { Stack, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { FontSize } from "../utils/constants"

const RosConnectionStatus = () => {
  const isConnected = useSelector(state => state.ros.isConnected)
  const statusLabel = isConnected ? "Conectado..." : "Desconectado"

  return (
    <Stack 
      flexDirection={'row'} 
      gap={2} 
      alignItems="center" 
      justifyContent="center">
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: isConnected ? 'rgb(0,200,0,0.9)' : 'rgb(200,0,0,0.9)',
        }}
      ></div>
      <Typography textAlign="center" fontSize={FontSize.HIGH}>{statusLabel}</Typography>
    </Stack>
  )
}

export default RosConnectionStatus