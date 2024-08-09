import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '3em'
    },
    h2: {
      fontSize: '1.7em'
    },
    h3: {
      fontSize: '1.3em'
    },
    body1: {
      fontSize: '1em'
    },
    body2: {
      fontSize: '0.8em'
    }
  },
  components: {
    MuiStack: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      padding: "0.5em"
    },
    MuiBox: {
      width: "100%",
      height: "100%"
    },
    
  }
})

export default theme