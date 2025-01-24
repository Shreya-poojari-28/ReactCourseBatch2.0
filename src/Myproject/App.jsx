import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Youtube from "react-youtube";
import "./index.css";

const MoviePage = () => {
    const [specificMovie, setSpecificMovie] = useState({});
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const navigate = useNavigate();
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const { id } = useParams();
    const image_url = "https://image.tmdb.org/t/p/original";

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    };

    useEffect(() => {
        // Fetch movie details
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e0cf3f53753d1facf51a6b91ba44937c`)
            .then((res) => res.json())
            .then((data) => setSpecificMovie(data))
            .catch((error) => console.error('Error fetching movie data:', error));

        // Fetch cast
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=e0cf3f53753d1facf51a6b91ba44937c`)
            .then((res) => res.json())
            .then((data) => setCast(data.cast.slice(0, 10)))
            .catch((error) => console.error('Error fetching cast:', error));
    }, [id]);

    const fetchTrailer = (movieId) => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=e0cf3f53753d1facf51a6b91ba44937c`)
            .then((res) => res.json())
            .then((data) => {
                setTrailer(data.results[0]?.key);
                setIsTrailerOpen(true);
            })
            .catch((error) => console.error('Error fetching trailer:', error));
    };

    const closeTrailer = () => {
        setIsTrailerOpen(false);
        setTrailer(null);
    };

    return (
        <div className="movie-page-container">
            {/* Movie Details Section */}
            <div className="movie-details">
                <div className="movie-poster">
                    {specificMovie?.backdrop_path ? (
                        <img
                            src={`${image_url}${specificMovie.backdrop_path}`}
                            alt={specificMovie.original_title || 'Movie Poster'}
                        />
                    ) : (
                        <p>Loading image...</p>
                    )}
                </div>
                <div className="movie-info">
                    <h1>{specificMovie?.original_title || 'Loading...'}</h1>
                    <p>{specificMovie?.overview || 'No description available.'}</p>
                    <p>
                        <strong>Rating:</strong> {specificMovie?.vote_average || 'N/A'}
                    </p>
                    <button className="trailer-button" onClick={() => fetchTrailer(id)}>
                        Watch Trailer
                    </button>
                </div>
            </div>

            {/* Cast Section */}
            <div className="movie-cast">
                <h2>Cast</h2>
                <div className="cast-list">
                    {cast.map((actor) => (
                        <div
                            key={actor.id}
                            className="cast-item"
                            onClick={() => navigate(`/cast/${actor.id}`)}
                        >
                            <img
                                src={
                                    actor.profile_path
                                        ? `${image_url}${actor.profile_path}`
                                        : 'https://via.placeholder.com/150'
                                }
                                alt={actor.name}
                            />
                            <p className="cast-name">{actor.name}</p>
                            <p className="cast-character">as {actor.character}</p>
                        </div>
                    ))}
                </div>
            </div>

            {isTrailerOpen && (
                <div className="trailer-modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={closeTrailer}>
                            Close
                        </button>
                        {trailer && <Youtube videoId={trailer} opts={opts} />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MoviePage;