import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const Header = ({Title, children}) => {
  
  return (
    <Box className="header" >
      <Typography variant='h1'>{Title}</Typography>
      {children}
    </Box>
  )
} 

Header.propTypes = {
  Title: PropTypes.string,
  children: PropTypes.element
}

export default Header