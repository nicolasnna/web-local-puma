import ContainerElement from '@components/ContainerElement'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const ManagePathNav = () => {
  const arrayPosition = useSelector(state => state.position)

  return (
    <ContainerElement 
      Title="Configuración de destinos para la navegación"
    >
      <TableContainer sx={{ maxHeight: 550}} className='manage-path__table'>
        <Table aria-label="table path nav" >
          <TableHead className='manage-path__table__head'>
            <TableRow>
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
    </ContainerElement>
  )
}

ManagePathNav.propTypes = {}

export default ManagePathNav