import PropTypes from 'prop-types'
import { Typography } from '@mui/material'

const StatusAlive = ({isAlive}) => {
  return (
    <div className='status'>
      <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '1px solid black',
            backgroundColor: isAlive ? 'rgb(0,200,0,0.9)' : 'rgb(200,0,0,0.9)',
          }}
        />
      <Typography className='status__text'>
        {isAlive ? "En línea" : "Sin conexión"}
      </Typography>
    </div>
  )
}

StatusAlive.propTypes = {
  isAlive: PropTypes.bool
}

export default StatusAlive