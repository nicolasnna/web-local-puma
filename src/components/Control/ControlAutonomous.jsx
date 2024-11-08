import React from 'react'
import PropTypes from 'prop-types'
import { useRosContext } from '@utils/RosContext'

const ControlAutonomous = () => {
  const rosInstance = useRosContext()

  return (
    <div>ControlAutonomous</div>
  )
}

ControlAutonomous.propTypes = {}

export default ControlAutonomous