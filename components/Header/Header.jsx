import React, { useState } from 'react'
import './styles.scss'
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    
    // toggle menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated'); // Xóa khỏi localStorage
        navigate('/login'); // Điều hướng về trang Login
      };

    return (
        <div>
            <nav>
            <div className="logo-header" onClick={() => navigate('/')}>My Gallery</div>
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                <li><a onClick={() => navigate('/')}>Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#pages">Pages</a></li>
                <li><a onClick={() => navigate('/login')}>Login</a></li>
                <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
            </nav>
        </div>
  )
}