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

const labelModes = {
  "idle": "Standby",
  "web": "Web",
  "navegacion": "Navegación",
  "joystick": "Joystick"
}

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
        {labelModes[modeController]}
      </Typography>
      <IconButton onClick={() => setOpenDialog(true)}>
        <SettingsIcon className="status-controller__icon" />
      </IconButton>
      <Dialog open={openDialog} className="status-controller__dialog">
        <DialogTitle className="status-controller__dialog--title">
          Configuración de control PUMA
        </DialogTitle>
        <DialogContent className="status-controller__dialog--content">
          <Typography>
            <b>Standby</b>: Robot en reposo con controlador desactivado y frenos activos. 
          </Typography>
          <Typography>
            <b>Web</b>: Control del robot a traves de la web (teleoperado). 
          </Typography>
          <Typography>
            <b>Navegación</b>: Control de movimiento del robot con algoritmos internos del robot para la navegación por waypoints.
          </Typography>
          <Typography>
            <b>Joystick</b>: Control del robot usando control de xbox 360 configurado (requiere estar cerca del robot).
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
                <MenuItem value="idle">{labelModes["idle"]}</MenuItem>
                <MenuItem value="web">{labelModes["web"]}</MenuItem>
                <MenuItem value="navegacion">{labelModes["navegacion"]}</MenuItem>
                <MenuItem value="joystick">{labelModes["joystick"]}</MenuItem>
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
