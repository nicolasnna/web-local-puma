import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'
const Header = ({Title}) => {
  
  return (
    <Box className="header" >
      <Typography variant='h1'>{Title}</Typography>
    </Box>
  )
} 

Header.propTypes = {
  Title: PropTypes.string
}

export default Header