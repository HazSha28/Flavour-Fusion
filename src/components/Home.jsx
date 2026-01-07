import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
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
          <img id="ilogo" src="/images/Flavour_Fusion-removebg-preview.png" alt="Logo" />
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

      <div className="headimg">
        <h1>Curated with soul, crafted with art,<br />where Every Bite is a Perfect Blend of Flavours.</h1>
        <img src="/images/head-removebg-preview.png" alt="header image" />
      </div>

      <nav className="min-header">
        <a href="#GC">Global Cravings</a>
        <a href="#BBB">Bites, Brunch & Bowls</a>
        <a href="#EW">Eat your Way</a>
        <a href="#DD">Desserts & Drinks</a>
        <a href="#SM">Smart Picks & Mood Meals</a>
        <a href="#SD">Soups & Drinks</a>
      </nav>

      <div id="GC" className="main">
        <h4>Global Cravings</h4>
      </div>
      <div className="parent">
        <a href="/recipe1"><img src="/globalhtml/F1.jpg" className="food-img" alt="Pizza" /><h3>PIZZA</h3></a>
        <a href="/recipe1"><img src="/globalhtml/F2.jpg" className="food-img" alt="Shawarma" /><h3>SHAWARMA</h3></a>
        <a href="/recipe1"><img src="/globalhtml/F3.jpg" className="food-img" alt="Birria Tacos" /><h3>BIRRIA TACOS</h3></a>
        <a href="/recipe1"><img src="/globalhtml/F4.jpg" className="food-img" alt="Dumplings" /><h3>DUMPLINGS</h3></a>
        <a href="/recipe1"><img src="/globalhtml/F5.jpg" className="food-img" alt="Paratha and Pepper Chicken Curry" /><h3>PARATHA AND PEPPER CHICKEN CURRY</h3></a>
        <a href="/recipe1"><img src="/globalhtml/F6.jpg" className="food-img" alt="Cheese Loaded Alfredo Pasta" /><h3>CHEESE LOADED ALFREDO PASTA</h3></a>
        <a href="/recipe1"><img src="/globalhtml/F7.jpg" className="food-img" alt="Dahi Poori" /><h3>DAHI POORI</h3></a>
        <a href="/recipe1"><img src="/globalhtml/F8.jpg" className="food-img" alt="Sushi" /><h3>SUSHI</h3></a>
      </div>

      <div id="BBB" className="main">
        <h4>Bites, Brunch & Bowls</h4>
      </div>
      <div className="parent">
        <a href="/recipe2"><img src="/BitesBB/F1.jpg" className="food-img" alt="High Protein Bowl" /><h3>HIGH PROTEIN BOWL</h3></a>
        <a href="/recipe2"><img src="/BitesBB/F2.jpg" className="food-img" alt="Peach Banana Smoothie Bowl" /><h3>PEACH BANANA SMOOTHIE BOWL </h3></a>
        <a href="/recipe2"><img src="/BitesBB/F3.jpg" className="food-img" alt="Turkish Poached Eggs" /><h3>TURKISH POACHED EGGS</h3></a>
        <a href="/recipe2"><img src="/BitesBB/F4.jpg" className="food-img" alt="Mini Frittata" /><h3>MINI FRITTATA</h3></a>
        <a href="/recipe2"><img src="/BitesBB/F5.jpg" className="food-img" alt="Shakshuka with Feta" /><h3>SHAKSHUKA WITH FETA</h3></a>
        <a href="/recipe2"><img src="/BitesBB/F6.jpg" className="food-img" alt="Garlic Rice with White Sauce Chicken" /><h3>GARLIC RICE WITH WHITE SAUCE CHICKEN</h3></a>
        <a href="/recipe2"><img src="/BitesBB/F7.jpg" className="food-img" alt="Coleslaw" /><h3>COLESLAW</h3></a>
        <a href="/recipe2"><img src="/BitesBB/F8.jpg" className="food-img" alt="Fruit Salad" /><h3>FRUIT SALAD</h3></a>
      </div>
      
      <div id="EW" className="main"><h3>Eat your Way</h3></div>
      <div className="parent">
        <a href="/recipe3"><img src="/EatW/f1.jpg" className="food-img" alt="Creamy Garlic Sauce with Steak and Shrimp" /><h3>CREAMEY GARLIC SAUCE WITH STEAK AND SHRIMP</h3></a>
        <a href="/recipe3"><img src="/EatW/F2.jpg" className="food-img" alt="Grilled Salmon" /><h3>GRILLED SALMON</h3></a>
        <a href="/recipe3"><img src="/EatW/f3.jpg" className="food-img" alt="Pie and Mash" /><h3>PIE AND MASH</h3></a>
        <a href="/recipe3"><img src="/EatW/f4.jpg" className="food-img" alt="Turkish Fatayer" /><h3>TURKISH FATAYER</h3></a>
        <a href="/recipe3"><img src="/EatW/F5.jpg" className="food-img" alt="Stuffed Seafood Bowl" /><h3>STUFFED SEAFOOD BOWL</h3></a>
        <a href="/recipe3"><img src="/EatW/F6.jpg" className="food-img" alt="Biriyni" /><h3>BIRIYANI</h3></a>
        <a href="/recipe3"><img src="/EatW/F7.jpg" className="food-img" alt="Honey Garlic Chicken" /><h3>HONEY GARLIC CHICKEN</h3></a>
        <a href="/recipe3"><img src="/EatW/F8.jpg" className="food-img" alt="Butter Chicken with Naan" /><h3>BUTTER CHICKEN WITH NAAN</h3></a>
      </div>

      <div id="DD" className="main"><h3>Desserts</h3></div>
      <div className="parent">
        <a href="/recipe4"><img src="/DD/F5.jpg" className="food-img" alt="Mousse" /><h3>MOUSSE</h3></a>
        <a href="/recipe4"><img src="/DD/F2.jpg" className="food-img" alt="Baklava" /><h3>BAKLAVA</h3></a>
        <a href="/recipe4"><img src="/DD/F7.jpg" className="food-img" alt="Creamy Basque Cheesecake" /><h3>CREAMY BASQUE CHEESECAKE</h3></a>
        <a href="/recipe4"><img src="/DD/F1.jpg" className="food-img" alt="Fudge Brownies" /><h3>FUDGE BROWNIES</h3></a>
        <a href="/recipe4"><img src="/DD/F4.jpg" className="food-img" alt="Tiramisu" /><h3>TIRAMISU</h3></a>
        <a href="/recipe4"><img src="/DD/F3.jpg" className="food-img" alt="Basil Infused Lemon Tart" /><h3>BASIL INFUSED LEMON TART</h3></a>
        <a href="/recipe4"><img src="/DD/F6.jpg" className="food-img" alt="French Creme Brulee" /><h3>FRENCH CREME BRULEE</h3></a>
        <a href="/recipe4"><img src="/DD/F8.jpg" className="food-img" alt="Apple Mille Fueille" /><h3>APPLE MILLE FUEILLE</h3></a>
      </div>

      <div id="SM" className="main">
        <h3>Smart Picks & Mood Meals</h3>
      </div>
      <div className="parent">
        <a href="/recipe5"><img src="/SmartP/F1.jpg" className="food-img" alt="Spring Rolls" /><h3>SPRING ROLLS</h3></a>
        <a href="/recipe5"><img src="/SmartP/F2.jpg" className="food-img" alt="Spaghetti" /><h3>SPAGHETTI</h3></a>
        <a href="/recipe5"><img src="/SmartP/F3.jpg" className="food-img" alt="Lasagna" /><h3>LASAGNA</h3></a>
        <a href="/recipe5"><img src="/SmartP/F4.jpg" className="food-img" alt="Tortilla" /><h3>TORTILLA</h3></a>
        <a href="/recipe5"><img src="/SmartP/F5.jpg" className="food-img" alt="Stuffed Portbello Mushrooms" /><h3>STUFFED PORTBELLO MUSHROOMS</h3></a>
        <a href="/recipe5"><img src="/SmartP/F6.jpg" className="food-img" alt="Ratatouille" /><h3>RATATOUILLE</h3></a>
        <a href="/recipe5"><img src="/SmartP/F7.jpg" className="food-img" alt="African Fufu" /><h3>AFRICAN FUFU</h3></a>
        <a href="/recipe5"><img src="/SmartP/F8.jpg" className="food-img" alt="Chicken Pasanda" /><h3>CHICKEN PASANDA</h3></a>
      </div>
      
      <div id="SD" className="main"><h3>Soups & Drinks</h3></div>
      <div className="parent">
        <a href="/recipe6"><img src="/SD/F1.jpg" className="food-img" alt="Cream Mushroom Soup" /><h3>CREAME MUSHROOM SOUP</h3></a>
        <a href="/recipe6"><img src="/SD/F2.jpg" className="food-img" alt="Manchow Soup" /><h3>MANCHOW SOUP</h3></a>
        <a href="/recipe6"><img src="/SD/F3.jpg" className="food-img" alt="Savoury Pumpkin Soup" /><h3>SAVOURY PUMPKIN SOUP</h3></a>
        <a href="/recipe6"><img src="/SD/F4.jpg" className="food-img" alt="Chicken Soup" /><h3>CHICKEN SOUP</h3></a>
        <a href="/recipe6"><img src="/SD/F5.jpg" className="food-img" alt="Lemon Mojito" /><h3>LEMON MOJITO</h3></a>
        <a href="/recipe6"><img src="/SD/F6.jpg" className="food-img" alt="Blue Lagoon Mojito" /><h3>BLUE LAGOON MOJITO</h3></a>
        <a href="/recipe6"><img src="/SD/F7.jpg" className="food-img" alt="Avacado Smoothie" /><h3>AVACADO SMOOTHIE</h3></a>
        <a href="/recipe6"><img src="/SD/F8.jpg" className="food-img" alt="Dates Shake" /><h3>DATES SHAKE</h3></a>
      </div>
      <br /><br /><br />

      <footer>
        &copy; All rights Reserved 2025
      </footer>
    </>
  );
};

export default Home;
