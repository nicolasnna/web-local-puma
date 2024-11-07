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
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            border: '1px solid black',
            backgroundColor: isConnected ? 'rgb(0,200,0,0.9)' : 'rgb(200,0,0,0.9)',
          }}
        />
        {label!= "" && <Typography className='connection-robot-status__item__text'>
          {label}
        </Typography>}
        {needButton &&
          <Button className="connection-robot-status__item__button button--primary">
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