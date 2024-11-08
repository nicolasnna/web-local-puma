import { Typography } from "@mui/material"
import PropTypes from "prop-types"

const Header = ({ title, children, extraClassName }) => {
  return (
    <div className={`header ${extraClassName}`}>
      <div className={'header--title'}>
        <Typography variant="h1">{title}</Typography>
      </div>
      {children}
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  extraClassName: PropTypes.string,
}

export default Header
