import React, { useState } from 'react'
import './styles.scss'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveUserLogout } from '../../src/redux/action';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // toggle menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const handleLogout = () => {
        dispatch(saveUserLogout())
        localStorage.removeItem('jwt'); // Xóa khỏi localStorage
        navigate('/login'); // Điều hướng về trang Login
      };

    return (
        <div>
            <nav>
            <div className="logo-header" onClick={() => navigate('/')}>PROFILE</div>
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                <li><a onClick={() => navigate('/')}>Home</a></li>
                <li><a onClick={() => navigate('/login')}>Login</a></li>
                <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
            </nav>
        </div>
  )
}