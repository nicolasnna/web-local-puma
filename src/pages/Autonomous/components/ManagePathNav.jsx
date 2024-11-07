import ContainerElement from "@components/ContainerElement"
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { setSelectedPosition } from "@reducer/positionReducer"

const ManagePathNav = () => {
  const arrayPosition = useSelector((state) => state.position)
  const selectedPosition = arrayPosition.selectedPosition
  const dispatch = useDispatch()

  const changePosition = (index, up) => {
    let arrayMod = [...selectedPosition]
    const newIndex = up ? index-1 : index+1
    arrayMod[index] = selectedPosition[newIndex]
    arrayMod[newIndex] = selectedPosition[index]
    dispatch(setSelectedPosition(arrayMod))
  }


  return (
    <ContainerElement
      extraClassName="manage-path--container"
      Title="Lista de destinos creados"
    >
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
                <TableCell
                  align="center"
                  className="manage-path__table__head--cell"
                >
                  
                </TableCell>
              </TableRow>
            </TableHead>
              <TableBody className="manage-path__table__body">
                {selectedPosition.length == 0 && 
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography className="manage-path__text-not-found">
                      No existe destinos creados
                    </Typography>
                  </TableCell>
                </TableRow>
                }
                { selectedPosition.length != 0 && selectedPosition.map((pos, index) => (
                  <TableRow
                    key={arrayPosition.labelSelection[index]}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="manage-path__table__body--row"
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="manage-path__table__body--cell"
                    >
                      <Typography>
                        {arrayPosition.labelSelection[index]}
                      </Typography>
                    </TableCell>
                    <TableCell className="manage-path__table__body--cell">
                      {pos[0].toFixed(5)}
                    </TableCell>
                    <TableCell className="manage-path__table__body--cell">
                      {pos[1].toFixed(5)}
                    </TableCell>
                    <TableCell className="manage-path__table__body--cell">
                      <div>
                        {index !== 0  && <IconButton onClick={() => changePosition(index,true)}>
                              <KeyboardArrowUpIcon/>
                            </IconButton>}
                        {index !== selectedPosition.length -1 && <IconButton onClick={() => changePosition(index, false)}>
                              <KeyboardArrowDownIcon/>
                            </IconButton>}
                      </div>
                    </TableCell>
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
  rosInstance: PropTypes.object,
}

export default ManagePathNav
