// Cast.js
import React from 'react';

const Cast = ({ cast }) => {
  return (
    <div className="cast">
      <h2>Cast</h2>
      <div className="cast-list">
        {cast.map((actor) => (
          <div key={actor.cast_id} className="cast-member">
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p>{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;
