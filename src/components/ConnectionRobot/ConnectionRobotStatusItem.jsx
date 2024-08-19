import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Typography } from '@mui/material'

const ConnectionRobotStatusItem = ({
  isConnected = false,
  label = "",
  needButton = false
}) => {
  return (
    <Box className="connection-robot-status__item">
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: isConnected ? 'rgb(0,200,0,0.9)' : 'rgb(200,0,0,0.9)',
          }}
        />
        <Typography className='connection-robot-status__item__text'>
          {label}
        </Typography>
        {needButton &&
          <Button className="connection-robot-status__item__button">
            <Typography>Reiniciar</Typography>
          </Button>
        }
      </Box>
  )
}

ConnectionRobotStatusItem.propTypes = {
  isConnected: PropTypes.bool,
  label: PropTypes.string,
  needButton: PropTypes.bool
}

export default ConnectionRobotStatusItem