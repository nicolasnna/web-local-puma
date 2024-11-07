import { Typography } from "@mui/material"
import PropTypes from "prop-types"
import ConnectionRobotStatusItem from "./ConnectionRobot/ConnectionRobotStatusItem"
import { useSelector } from "react-redux"

const Header = ({ Title, children, extraClassName }) => {
  const rosIsConnected = useSelector(state => state.ros.isConnected)
  return (
    <div className={`header ${extraClassName}`}>
      <div>
        <ConnectionRobotStatusItem isConnected={rosIsConnected}/>
      </div>
      <div className={'header--title'}>
        <Typography variant="h1">{Title}</Typography>
      </div>
      {children}
    </div>
  )
}

Header.propTypes = {
  Title: PropTypes.string,
  children: PropTypes.element,
  extraClassName: PropTypes.string,
}

export default Header
