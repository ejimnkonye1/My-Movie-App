import React from 'react';
import imdb from '../assets/imdb.svg';
import tomato from '../assets/tomato.svg';
import loveIcon from '../assets/Favorite.svg';

function MovieCard({ movie }) {
  const percentage = movie.vote_average * 10;
  return (
    <div className="card h-100" data-testid="movie-card">
      <div className='bg-success' style={{ position: 'relative' }}>
        {/* Love icon */}
        <img
          src={loveIcon}
          alt="Love Icon"
          style={{
            position: 'absolute',
            top: '10px',
            
            right: '10px',
            width: '24px', // Adjust the size as needed
          }}
        />

        {/* Movie poster */}
        <img
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          alt={movie.title}
          className="card-img-top"
          data-testid="movie-poster"
          style={{ textDecoration: 'none' }}
        />
      </div>
      <div className="card-body">
        <p className="card-title" data-testid="movie-title">
          <strong>{movie.title}</strong>
        </p>
        <div className='d-flex justify-content-between '>
          <p className="card-text ">
            <img src={imdb} alt="IMDb Logo" /> {movie.rating.toFixed(1)}
          </p>
          <p className="card-text ya " >
            <img src={tomato} alt="Tomato Logo" /> {percentage}%
          </p>
        </div>
        <p className="card-text ya" data-testid="movie-release-date">
          Release Date (UTC): {movie.release_date}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
