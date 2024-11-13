import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import Slide from '@mui/material/Slide';
import { changeOnNotification } from "@reducer/notificationReducer";
import { useSnackbar } from "notistack";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const Notification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const state = useSelector(state => state.notification)
  const dispatch = useDispatch()
  
  const handleClose = (key) => {
    closeSnackbar(key);
    dispatch(changeOnNotification(false));
  };

  useEffect(() => {
    if (state.on) {
      enqueueSnackbar(state.label, {
        variant: state.severity, // 'success', 'error', 'warning', 'info'
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        autoHideDuration: 3500,
        TransitionComponent: SlideTransition,
        action: (key) => (
          <Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => handleClose(key)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        )
      });
    }
  }, [state, enqueueSnackbar, dispatch]);

  // const action = (
  //   <Fragment>
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="inherit"
  //       onClick={handleClose}
  //     >
  //       <CloseIcon fontSize="small"/>
  //     </IconButton>
      
  //   </Fragment>
  // )

  // return (
  //   <Snackbar
  //     open={state.on}
  //     anchorOrigin={{vertical: 'top', horizontal:'center'}}
  //     autoHideDuration={3500}
  //     TransitionComponent={SlideTransition}
  //     onClose={handleClose}
  //     action={action}
  //   >
  //     <Alert
  //       onClose={handleClose}
  //       severity={state.severity}
  //       color={state.color}
  //       sx={{width:"100%"}}
  //     >
  //       {state.label}
  //     </Alert>
  //   </Snackbar>
  // )
  return null; // No renderiza nada directamente
}

export default Notification