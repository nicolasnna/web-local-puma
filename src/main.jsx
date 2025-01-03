import { ThemeProvider } from '@mui/material'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import store from '@reducer/store'
import theme from './theme/theme.js'
import './styles.sass'
import { RosProvider } from '@utils/RosProvider'
import { SnackbarProvider } from 'notistack';


ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <RosProvider>
          <App />
        </RosProvider>
      </SnackbarProvider>
    </Provider>
  </ThemeProvider>
  //</React.StrictMode>,  
)
