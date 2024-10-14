import { Box, Typography } from "@mui/material"
import PropTypes from "prop-types"

const Header = ({ Title, children, extraClassName }) => {
  return (
    <Box className={`header ${extraClassName}`}>
      <Typography variant="h1">{Title}</Typography>
      {children}
    </Box>
  )
}

Header.propTypes = {
  Title: PropTypes.string,
  children: PropTypes.element,
  extraClassName: PropTypes.string,
}

export default Header
