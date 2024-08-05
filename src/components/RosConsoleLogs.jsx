import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import useField from "../hooks/useField"
import { setMessage } from "../reducer/rosReducer"
import { FontSize, PaddingSize } from "../utils/constants"

const RosConsoleLogs = ({rosInstance}) => {
  const logField = useField('/rosout')
  const logggs = useSelector(state => state.ros.message)
  const dispatch = useDispatch()

  const connectLogs = () => {
    rosInstance.subscribe(logField.value, 'rosgraph_msgs/Log', handlelogs)
    console.log(`connected to ${logField.value}`)
  }

  const handlelogs = (message) => {
    dispatch(setMessage(`${message.header.stamp.secs}.${message.header.stamp.nsecs} [${message.level}] ${message.name}: ${message.msg}`))
  }

  return (
    <Box component={Paper} display="flex" flexDirection={"column"} gap={2} padding={PaddingSize.NORMAL} height="max-content">
      <Stack flexDirection="row" gap={2} alignItems="center">
        <TextField 
          value={logField.value}
          onChange={logField.changeValue}
          required
          label="Tópico logs"
          margin="dense"
          size="small"
        />
        <Button variant="contained" size="small" onClick={connectLogs}>
          <Typography padding={PaddingSize.SMALL} fontSize={FontSize.NORMAL}>
            <strong>Subscribirse</strong>
          </Typography>
        </Button>
      </Stack>
      <Stack sx={{
        width:'40em',
        maxHeight: '15em',
        overflowY:'auto',
        backgroundColor: '#E2E3E6',
        padding: '0.5em'
      }}>
        {logggs.map((m,index) => <Typography key={`message ${index}`} fontSize={FontSize.SMALL}>
          {m}
        </Typography>)}
      </Stack>
    </Box>
  )
}

export default RosConsoleLogs