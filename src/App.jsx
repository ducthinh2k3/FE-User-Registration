import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        {/* <Route path="/" element={<Navigate to="/photos" replace />} />
        <Route path="/photos/:id" element={<Detail/>} />
        <Route path="*" element={<PageNotFound/>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
