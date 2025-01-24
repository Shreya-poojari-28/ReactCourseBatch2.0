// MoviePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cast from '../Cast/index';
import './index.css';

const MoviePage = () => {
  const { id } = useParams();
  const Api_key = '76c7e9ee4d6c534cee7e0ecd507e626b';
  const BaseUrl = 'https://api.themoviedb.org/3/';
  const image_url = 'https://image.tmdb.org/t/p/original';
  
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  
  // Fetch movie details and cast
  useEffect(() => {
    async function fetchMovieDetails() {
      const movieResponse = await axios.get(`${BaseUrl}movie/${id}`, {
        params: { api_key: Api_key },
      });
      setMovie(movieResponse.data);

      const castResponse = await axios.get(`${BaseUrl}movie/${id}/credits`, {
        params: { api_key: Api_key },
      });
      setCast(castResponse.data.cast);
    }

    fetchMovieDetails();
  }, [id]);

  // Fetch YouTube trailer
  const fetchTrailer = async () => {
    const videoResponse = await axios.get(`${BaseUrl}movie/${id}/videos`, {
      params: { api_key: Api_key },
    });
    const trailer = videoResponse.data.results.find((video) => video.type === 'Trailer');
    if (trailer) {
      setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
    }
  };

  return (
    <div>
      {movie && (
        <div className="movie-details">
          <div className="movie-poster">
            <img src={`${image_url}${movie.poster_path}`} alt={movie.title} />
          </div>
          <div className="movie-info">
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <button onClick={fetchTrailer}>Watch Trailer</button>
            {trailerUrl && (
              <div className="trailer">
                <a href={trailerUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
              </div>
            )}
          </div>
          <Cast cast={cast} />
        </div>
      )}
    </div>
  );
};

export default MoviePage;
