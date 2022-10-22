import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import SnackBar from './components/SnackBar'
import { useSelector } from "react-redux"
import { CreateEvent } from './pages/CreateEvent'
import { Profile } from './pages/Profile'
import { EventPage } from './pages/EventPage'
import TicketPage from './pages/TicketPage'

function App() {

  const { snackbarMessage } = useSelector((state) => state.global);

  return (<>
    <div className="max-w-3xl mx-auto px-3 sm:px-6 pb-6">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create-event' element={<CreateEvent />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/events/:id' element={<EventPage />} />
        <Route path='/events/:id/:uid' element={<TicketPage />} />
      </Routes>
      <SnackBar mssg={snackbarMessage} />
    </div>
  </>);
}

export default App;
