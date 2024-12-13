import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { publishModeControler } from '@services/rosPublishers';
import { RosContext } from '@utils/RosProvider';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const StatusController = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const modeController = useSelector((state) => state.ros.controlMode);
  const [newModeSelect, setNewModeSelect] = useState(modeController);
  const ros = useContext(RosContext);
  const dispatch = useDispatch();

  const handleChangeNewMode = (e) => {
    setNewModeSelect(e.target.value);
  };

  const handleAcceptModal = () => {
    setOpenDialog(false);
    const status = publishModeControler(ros, dispatch, newModeSelect);
    setNewModeSelect(status ? newModeSelect : modeController);
  };

  return (
    <Box className="status-controller">
      <Typography className="status-controller__text">
        {modeController}
      </Typography>
      <IconButton onClick={() => setOpenDialog(true)}>
        <SettingsIcon className="status-controller__icon" />
      </IconButton>
      <Dialog open={openDialog} className="status-controller__dialog">
        <DialogTitle className="status-controller__dialog--title">
          Selector de modo PUMA
        </DialogTitle>
        <DialogContent className="status-controller__dialog--content">
          <Typography>
            <b>manual</b>: uso de botones para controlar la dirección y
            velocidad del robot.
          </Typography>
          <Typography>
            <b>autonomo</b>: permite manejo de waypoints para definir la
            navegación, asi como habilita botones especiales para ello.
          </Typography>
          <Typography>
            <b>joystick</b>: permite el control del robot por medio de su
            joystick de xbox.
          </Typography>
          <Box component="form" className="status-controller__form">
            <FormControl>
              <InputLabel htmlFor="mode-puma">Modo</InputLabel>
              <Select
                autoWidth
                variant="filled"
                onChange={handleChangeNewMode}
                value={newModeSelect}
                inputProps={{
                  name: 'new-mode',
                  id: 'new-mode',
                }}
              >
                <MenuItem value="none">ninguno</MenuItem>
                <MenuItem value="manual">manual</MenuItem>
                <MenuItem value="autonomous">autonomo</MenuItem>
                <MenuItem value="joystick">joystick</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions className="status-controller__dialog--actions">
          <Button
            className="button--secondary"
            onClick={() => setOpenDialog(false)}
          >
            Cerrar
          </Button>
          <Button className="button--primary" onClick={handleAcceptModal}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StatusController;
