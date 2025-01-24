import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';  // Import the CSS file for styling

function Card({ item }) {

  const image_url = 'https://image.tmdb.org/t/p/original'

  return (
    <div className="movie-card-container">
      <div className="movie-card">
        <Link to={`/movie/${item.id}`}>
        <img src={`${image_url}${item.poster_path}`} className="movie-image" />

        </Link>
      <div className="movie-details">
        <h2 className="movie-title">{item.original_title}</h2>
        <p className="movie-release-date">{item.voteaverage}</p>
        <p className="movie-description">{item.overview.slice(0, 100) + '...'}</p>
      </div>
    </div>
    </div>
  );
}

export default Card;
