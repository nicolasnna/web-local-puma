import ContainerElement from '@components/ContainerElement'
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { WAYPOINTS_SEND_TOPIC, WAYPOINTS_START_TOPIC, WAYPOINTS_STOP_TOPIC } from '@utils/constants'
import { successNotification } from '@reducer/notificationReducer'
import { useState } from 'react'


const ManagePathNav = ({rosInstance}) => {
  const [readyPath, setReadyPath] = useState(false)
  const arrayPosition = useSelector(state => state.position)
  const dispatch = useDispatch()
  const rosIsConnected = useSelector(state => state.ros.isConnected)

  const updateWaypoints = () => {
    if (arrayPosition.selectedPosition.length>0 && rosIsConnected) {
      const path = arrayPosition.selectedPosition.map(latlon => ({latitude: latlon[0], longitude: latlon[1]}))
      rosInstance.sendMessage(
        WAYPOINTS_SEND_TOPIC,
        'puma_waypoints_msgs/GoalGpsArray',
        {data: path}
      )
      dispatch(successNotification("Los destinos han sido enviados al robot"))
      setReadyPath(true)
    }
  }

  const startNavPath = () => {
    if (readyPath) {
      rosInstance.sendMessage(
        WAYPOINTS_START_TOPIC,
        'std_msgs/Empty',
        {}
      )
      dispatch(successNotification("Se ha enviado la señal de inicio al robot"))
    }
  }

  const stopNavPath = () => {
    rosInstance.sendMessage(
      WAYPOINTS_STOP_TOPIC,
      'std_msgs/Empty',
      {}
    )
    dispatch(successNotification("Se ha enviado la señal de detención al robot"))
    setReadyPath(false)
  }

  return (
    <ContainerElement 
      Title="Configuración de destinos para la navegación"
    >
      <Box className="manage-path">
        <Box className="manage-path__buttons-option">
          <Button className="button--primary" disabled={!arrayPosition.selectedPosition.length>=1 || !rosIsConnected} onClick={updateWaypoints}>
            Subir al robot
          </Button>
          <Button className="button--primary" disabled={!readyPath || !rosIsConnected} onClick={startNavPath}>
            Empezar
          </Button>
          <Button className="button--secondary" disabled={!rosIsConnected}  onClick={stopNavPath}>
            Detener
          </Button>
        </Box>
        <TableContainer sx={{ maxHeight: 520}} className='manage-path__table'>
          <Table aria-label="table path nav">
            <TableHead className='manage-path__table__head'>
              <TableRow className='manage-path__table__head--row'>
                <TableCell align='center' className='manage-path__table__head--cell'>Etiqueta</TableCell>
                <TableCell align='center' className='manage-path__table__head--cell'>Latitud</TableCell>
                <TableCell align='center' className='manage-path__table__head--cell'>Longitud</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="manage-path__table__body">
              {arrayPosition.selectedPosition.map((pos,index) => (
                <TableRow
                  key={arrayPosition.labelSelection[index]}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className="manage-path__table__body--row"
                >
                  <TableCell component="th" scope="row" className="manage-path__table__body--cell">
                    {arrayPosition.labelSelection[index]}
                  </TableCell>
                  <TableCell className="manage-path__table__body--cell">{pos[0].toFixed(5)}</TableCell>
                  <TableCell className="manage-path__table__body--cell">{pos[1].toFixed(5)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ContainerElement>
  )
}

ManagePathNav.propTypes = {
  rosInstance: PropTypes.object
}

export default ManagePathNav