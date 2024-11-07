import { ThemeProvider } from '@mui/material'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import store from '@reducer/store'
import theme from './theme/theme.js'
import './styles.sass'
import {
  BrowserRouter as Router
} from "react-router-dom"


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </ThemeProvider>
  // </React.StrictMode>,  
)
