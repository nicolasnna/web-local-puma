import { Alert, IconButton, Snackbar } from "@mui/material"
import { Fragment } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { changeOnNotification } from "@reducer/notificationReducer";

const Notification = () => {
  const state = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(changeOnNotification(false))
  }

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small"/>
      </IconButton>
      
    </Fragment>
  )

  return (
    <Snackbar
      open={state.on}
      autoHideDuration={3500}
      onClose={handleClose}
      action={action}
    >
      <Alert
        onClose={handleClose}
        severity={state.severity}
        color={state.color}
        sx={{width:"100%"}}
      >
        {state.label}
      </Alert>
    </Snackbar>
  )
}

export default Notification