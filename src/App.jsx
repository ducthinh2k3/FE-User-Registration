import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Home } from './pages/Home/Home';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        {/* <Route path="/" element={<Navigate to="/home" replace />} /> */}
        {/* <Route path="/photos/:id" element={<Detail/>} />
        <Route path="*" element={<PageNotFound/>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
