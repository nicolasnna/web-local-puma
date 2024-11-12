import ContainerElement from "@components/ContainerElement"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
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
} from "@mui/material"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"

const TablePositionList = ({
  title,
  valueList,
  labelList,
  setValueList = () => {},
  addChangePosition = false,
}) => {
  const positionList = valueList
  const dispatch = useDispatch()

  const changePosition = (index, up) => {
    let arrayMod = [...positionList]
    const newIndex = up ? index - 1 : index + 1
    arrayMod[index] = positionList[newIndex]
    arrayMod[newIndex] = positionList[index]
    dispatch(setValueList(arrayMod))
  }

  return (
    <ContainerElement
      extraClassName="manage-path--container"
      Title={title}
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
                {addChangePosition && (
                  <TableCell
                    align="center"
                    className="manage-path__table__head--cell"
                  ></TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody className="manage-path__table__body">
              {positionList.length == 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography className="manage-path__text-not-found">
                      No existe destinos creados
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {positionList.length != 0 &&
                positionList.map((pos, index) => (
                  <TableRow
                    key={labelList[index]}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="manage-path__table__body--row"
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="manage-path__table__body--cell"
                    >
                      <Typography>{labelList[index]}</Typography>
                    </TableCell>
                    <TableCell className="manage-path__table__body--cell">
                      {pos[0].toFixed(5)}
                    </TableCell>
                    <TableCell className="manage-path__table__body--cell">
                      {pos[1].toFixed(5)}
                    </TableCell>
                    {addChangePosition && (
                      <TableCell className="manage-path__table__body--cell">
                        <div>
                          {index !== 0 && (
                            <IconButton
                              onClick={() => changePosition(index, true)}
                            >
                              <KeyboardArrowUpIcon />
                            </IconButton>
                          )}
                          {index !== positionList.length - 1 && (
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
  )
}

TablePositionList.propTypes = {
  title: PropTypes.string,
  valueList: PropTypes.array,
  labelList: PropTypes.array,
  setValueList: PropTypes.func,
  addChangePosition: PropTypes.bool,
}

export default TablePositionList
