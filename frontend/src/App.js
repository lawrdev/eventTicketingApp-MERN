import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import SnackBar from './components/SnackBar'
import { useSelector } from "react-redux"
import { CreateEvent } from './pages/CreateEvent'
import { Profile } from './pages/Profile'
import { EventPage } from './pages/EventPage'
import { TicketPage } from './pages/TicketPage'
import CategoryPage from './pages/CategoryPage'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import PicturePage from './pages/PicturePage'

export const cloud_name = "dqveipmsp";

function App() {

  const { snackbarMessage } = useSelector((state) => state.global);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#A855F7',//'#EAB308'
      },
      purple: {
        main: '#A855F7',
      },
      secondary: {
        main: '#374151',
        contrastText: '#F8F9FA',
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    }
  })

  return (<>
    <div className="max-w-5xl mx-auto">
      <ThemeProvider theme={theme}>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category/:type' element={<CategoryPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create-event' element={<CreateEvent />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/events/:id' element={<EventPage />} />
          <Route path='/events/picture/:id' element={<PicturePage />} />
          <Route path='/events/:id/:uid' element={<TicketPage />} />
        </Routes>
        <SnackBar mssg={snackbarMessage} />

      </ThemeProvider>
    </div>
  </>);
}

export default App;
