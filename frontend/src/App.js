import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import SnackBar from './components/SnackBar'
import { useSelector } from "react-redux"
import { CreateEvent } from './pages/CreateEvent'
import { Profile } from './pages/Profile'

function App() {

  const { isSnackbarOpen, snackbarMessage } = useSelector((state) => state.global);

  return (<>
    <Header />
    <div className="max-w-4xl mx-auto px-3 sm:px-6 pb-6">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create-event' element={<CreateEvent />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <SnackBar isOpen={isSnackbarOpen} mssg={snackbarMessage} />
    </div>
  </>);
}

export default App;
