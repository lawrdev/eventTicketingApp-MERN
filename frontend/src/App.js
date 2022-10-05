import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { Login } from './pages/Login'

function App() {
  return (<>
    <Header />
    <div className="max-w-4xl mx-auto p-6">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  </>);
}

export default App;
