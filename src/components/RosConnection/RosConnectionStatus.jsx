import { Stack, Typography } from "@mui/material"
import { useSelector } from "react-redux"

const RosConnectionStatus = () => {
  const isConnected = useSelector(state => state.ros.isConnected)
  const statusLabel = isConnected ? "Conectado..." : "Desconectado"

  return (
    <Stack 
      flexDirection={'row'} 
      gap={2}
      >
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: isConnected ? 'rgb(0,200,0,0.9)' : 'rgb(200,0,0,0.9)',
        }}
      ></div>
      <Typography textAlign="center" variant="h3">{statusLabel}</Typography>
    </Stack>
  )
}

export default RosConnectionStatus