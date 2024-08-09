import { Box, Button, Stack, Paper, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import useField from "../../hooks/useField"
import { setRosUrl } from "../../reducer/rosReducer";
import RosConnectionStatus from "./RosConnectionStatus";
import { useState } from "react";

const RosConnectionControl = ({rosInstance}) => {
  const dispatch = useDispatch()
  const urlField = useField(useSelector((state)=> state.ros.rosUrl))
  const isRosConnected = useSelector(state => state.ros.isConnected)
  const [labelButton, setLabelButton] = useState("Conectar")

  const handleConnectionRos = (e) => {
    e.preventDefault()
    dispatch(setRosUrl(urlField.value))
    if (isRosConnected) {
      rosInstance.closeConnection()
      setLabelButton("Conectar")
    } else {
      rosInstance.openConnection()
      setLabelButton("Desconectar")
    }
  } 

  return (
    <Box component={Paper} 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center"
      width="25vw"
      height="100%"
    >
      <Stack>
        <Typography variant="h2">Conectar con ROS</Typography>
      </Stack>
      <Stack
        flexDirection="row"
        gap={1}
        width="100%"
        height="100%"
        onSubmit={handleConnectionRos}
      >
        <TextField
          label="url ROS"
          value={urlField.value}
          size="small"
          onChange={urlField.changeValue}
          type="url"
          margin="normal"
        />
        <Button
          variant="contained"
          onClick={handleConnectionRos}
        >
          <Typography padding={0.5} variant="body1">
            <strong>{labelButton}</strong>
          </Typography>
        </Button>
      </Stack>
      <RosConnectionStatus/>
    </Box>
  )
}

export default RosConnectionControl