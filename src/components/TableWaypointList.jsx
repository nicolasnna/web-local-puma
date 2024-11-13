import ContainerElement from '@components/ContainerElement';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { setWaypointsKeyValue } from '@reducer/waypointsReducer';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

const TableWaypointList = ({ title, keyChangePosition, waypoints }) => {
  const dispatch = useDispatch();
  const validCorrectKey =
    keyChangePosition === 'web' || keyChangePosition === 'robot';

  const changePosition = (index, up) => {
    let arrayMod = [...waypoints];
    const newIndex = up ? index - 1 : index + 1;
    arrayMod[index] = {
      latitude: waypoints[newIndex].latitude,
      longitude: waypoints[newIndex].longitude,
      label: arrayMod[index].label,
    };
    arrayMod[newIndex] = {
      latitude: waypoints[index].latitude,
      longitude: waypoints[index].longitude,
      label: arrayMod[newIndex].label,
    };

    dispatch(setWaypointsKeyValue(keyChangePosition, 'waypoints', arrayMod));
  };

  return (
    <ContainerElement extraClassName="manage-path--container" Title={title}>
      <Box className="manage-path">
        <TableContainer sx={{ height: 350 }} className="manage-path__table">
          <Table aria-label="table path nav">
            <TableHead className="manage-path__table__head">
              <TableRow className="manage-path__table__head--row">
                <TableCell
                  align="center"
                  className="manage-path__table__head--cell"
                >
                  Etiqueta
                </TableCell>
                <TableCell
                  align="center"
                  className="manage-path__table__head--cell"
                >
                  Latitud
                </TableCell>
                <TableCell
                  align="center"
                  className="manage-path__table__head--cell"
                >
                  Longitud
                </TableCell>
                {validCorrectKey && (
                  <TableCell
                    align="center"
                    className="manage-path__table__head--cell"
                  ></TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody className="manage-path__table__body">
              {waypoints.length == 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography className="manage-path__text-not-found">
                      No existe destinos creados
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {waypoints.length != 0 &&
                waypoints.map((w, index) => (
                  <TableRow
                    key={w.label}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    className="manage-path__table__body--row"
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="manage-path__table__body--cell"
                    >
                      <Typography>{w.label}</Typography>
                    </TableCell>
                    <TableCell className="manage-path__table__body--cell">
                      {w.latitude.toFixed(5)}
                    </TableCell>
                    <TableCell className="manage-path__table__body--cell">
                      {w.longitude.toFixed(5)}
                    </TableCell>
                    {validCorrectKey && (
                      <TableCell className="manage-path__table__body--cell">
                        <div>
                          {index !== 0 && (
                            <IconButton
                              onClick={() => changePosition(index, true)}
                            >
                              <KeyboardArrowUpIcon />
                            </IconButton>
                          )}
                          {index !== waypoints.length - 1 && (
                            <IconButton
                              onClick={() => changePosition(index, false)}
                            >
                              <KeyboardArrowDownIcon />
                            </IconButton>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ContainerElement>
  );
};

TableWaypointList.propTypes = {
  title: PropTypes.string,
  keyChangePosition: PropTypes.string,
  waypoints: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      yaw: PropTypes.number,
      label: PropTypes.string,
    })
  ),
};

export default TableWaypointList;
