import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'


const RosParameters = ({rosInstance}) => {

  return (
    <Box className="rosparameters">
      <div className="rosparameters__title">
        <Typography>Parametros y configuración ROS</Typography>
      </div>
      
    </Box>
  )
}

RosParameters.propTypes = {
  rosInstance: PropTypes.object
}

export default RosParameters