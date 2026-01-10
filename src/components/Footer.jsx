import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Flavour Fusion</h3>
          <p>Curated with soul, Crafted with art, where every bite is a perfect blend of flavours</p>
          <div className="social-links">
            <a href="https://facebook.com/flavourfusion" target="_blank" rel="noopener noreferrer" className="social-link"><FaFacebook /></a>
            <a href="https://twitter.com/flavourfusion" target="_blank" rel="noopener noreferrer" className="social-link"><FaTwitter /></a>
            <a href="https://instagram.com/flavourfusion" target="_blank" rel="noopener noreferrer" className="social-link"><FaInstagram /></a>
            <a href="https://youtube.com/flavourfusion" target="_blank" rel="noopener noreferrer" className="social-link"><FaYoutube /></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/journal">Journaling</a></li>
            <li><a href="/favorites">Favorites</a></li>
            <li><a href="#GC">Global Cravings</a></li>
            <li><a href="#BBB">Bites, Brunch & Bowls</a></li>
            <li><a href="#EW">Eat your Way</a></li>
            <li><a href="#DD">Desserts & Drinks</a></li>
            <li><a href="#SM">Smart Picks</a></li>
            <li><a href="#SD">Soups & Drinks</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <div className="contact-item">
              <FaEnvelope />
              <span>flavourfusion@gmail.com</span>
            </div>
            <div className="contact-item">
              <FaPhone />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt />
              <span>123 Culinary Street, Food City, FC 12345</span>
            </div>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Subscribe to get the latest recipes and culinary tips</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2024 Flavour Fusion. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
