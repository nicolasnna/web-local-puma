import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { FontSize } from '../utils/constants'

const Header = ({Title}) => {
  
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent="center">
      <Typography fontSize={FontSize.TITLE} variant='h1'>{Title}</Typography>
    </Box>
  )
} 

Header.propTypes = {
  Title: PropTypes.string
}

export default Header