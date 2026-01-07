import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const About = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <>
      <header>
        <div className="logo">
          <img src="/images/Flavour_Fusion-removebg-preview.png" alt="Logo" />
          <span>FLAVOUR FUSION</span>
        </div>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          {currentUser ? (
            <>
              <span style={{ color: '#333', marginRight: '10px' }}>Welcome, {currentUser.username || currentUser.email}</span>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer', fontSize: 'inherit' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign up</Link>
            </>
          )}
        </nav>
      </header>
      
      <div className="bg2">
        <div className="imgs down">
          <img src="/images/fly4-removebg-preview (1).png" alt="Food decoration" />
        </div>
        
        <div className="para">
          <h1 style={{textAlign: 'center', marginTop: '10px', color: '#333333'}}> ABOUT US</h1>
          <p>
            <i>
              <b>Hey there, foodie friend! 👋<br /></b>
              Welcome to Flavour Fusion - your kitchen's new bestie and the answer to <br /><b><br />"what should I cook today?"</b><br /><br />
              We're a <b><i>fun bunch of food lovers and tech wizards</i></b> who believe cooking shouldn't be complicated or boring. Whether you're a master chef or someone who once burned water (we don't judge!), Flavour Fusion is here to make cooking easy, exciting, and<i> totally you.</i>
              <ul><br /><b>
                Our smart kitchen buddy helps you:</b>
                <li> Whip up recipes based on what's already in your fridge </li>
                <li> Get step-by-step guidance (no confusing chef lingo here!) </li>
                <li> Customize meals to match your mood, taste, or random cravings</li>
                <li> Discover new dishes from around the world without booking a flight </li><br />
                Think of us as your personal recipe DJ - mixing ingredients, moods, and flavors into the perfect culinary playlist. Whether it's 2 am maggi or a Sunday feast, we've got your back (and your belly)!<br />
                <b>So roll up those sleeves, grab a spoon, and let's cook up some flavor-packed fun together! 🍽️💃</b>
              </ul>
            </i>
          </p>
        </div>
        
        <div className="imgs up">
          <img src="/images/fly3-removebg-preview.png" alt="Food decoration" />
        </div>
      </div>
      
      <footer>
        &COPY All rights Reserved 2025
      </footer>
    </>
  );
};

export default About;
