import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const navbarOptions = [
  { name: "Dashboard", route: "/"},
  { name: "Modo manual", route: "/manual"},
  { name: "Modo autónomo", route: "/autonomous"}
]

const Navbar = () => {
  return (
    <div className='navbar'>
      {navbarOptions.map( o => 
        <Link className='navbar__link' to={o.route} key={o.name}>
          <Box className='navbar__link__content'>
            <Typography>
              {o.name}
            </Typography>
          </Box>
        </Link>
      )
      }
    </div>
  )
}

Navbar.propTypes = {}

export default Navbar