import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css'; 

function Navbar({search, setSearch}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/" className="navbar-logo">MyMovies</Link>
        </div>

        <div className={`menu-items ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/" className="navbar-link">Home</Link></li>
            <li><Link to="/about" className="navbar-link">About</Link></li>
            <li><Link to="/services" className="navbar-link">Contact</Link></li>
          </ul>
        </div>

        <div className="input-container">
        <label htmlFor="input">
        <i className="fa-solid fa-magnifying-glass"></i>
        </label>
        <input
        id='input'
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder='Search Movies...'
        />
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
