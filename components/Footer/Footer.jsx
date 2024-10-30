import React from 'react'
import './styles.scss'

export const Footer = () => {
  return (
    <footer>
        <div class="footer-container">
            <div class="about-me">
                <h3>About Me</h3>
                <p>Do you want to be even more successful? Learn to love learning and growth. The more effort you put into improving your skills,</p>
            </div>
            <div class="newsletter">
                <h3>Newsletter</h3>
                <p>Stay updated with our latest trends</p>
                <input type="email" placeholder="Enter email address"/>
                <button>Send</button>
            </div>
            <div class="follow-me">
                <h3>Follow Me</h3>
                <p>Let us be social</p>
                <div class="social-icons">
                    <a href="#" class="social-icon">f</a>
                    <a href="#" class="social-icon">t</a>
                </div>
            </div>
        </div>
    </footer>
  )
}