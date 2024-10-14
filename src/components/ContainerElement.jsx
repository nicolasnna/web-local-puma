import { Box, Stack, Typography } from "@mui/material"
import PropTypes from "prop-types"

const ContainerElement = ({
  children,
  Title,
  Topic,
  currentDate,
  extraClassName,
}) => {
  return (
    <Box className={`container-element ${extraClassName}`}>
      <Stack className="container-element__header">
        <div className="container-element__header__title">
          <Typography variant="h3">{Title}</Typography>
        </div>
        <div className="container-element__header__subtitle">
          <Typography variant="body1">{Topic}</Typography>
        </div>
      </Stack>
      <Box className="container-element__content">{children}</Box>
      {currentDate && (
        <div className="container-element__time">
          <Typography>Última actualización: {currentDate}</Typography>
        </div>
      )}
    </Box>
  )
}

ContainerElement.propTypes = {
  children: PropTypes.element,
  Title: PropTypes.string,
  Topic: PropTypes.string,
  currentDate: PropTypes.string,
  extraClassName: PropTypes.string,
}

export default ContainerElement
