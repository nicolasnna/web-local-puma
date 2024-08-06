import { Button, Stack, Typography } from "@mui/material"
import { FontSize } from "../utils/constants"

const Model3dViewer = ({rosInstance}) => {

  const initUrdf = () => {
    
  }

  return (
    <Stack alignItems="center" justifyContent="center">
      <Typography fontSize={FontSize}>Ejemplo URDF</Typography>
      <Button onClick={() => initUrdf()}>Abrir urdf</Button>
      <div id="urdf" style={{ width: '1000px', height: '600px' }}/>
    </Stack>
  )
}

export default Model3dViewer