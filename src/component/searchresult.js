// SearchResults.js
import React from 'react';
import loveIcon from '../assets/Favorite.svg';
import imdb from '../assets/imdb.svg';
import tomato from '../assets/tomato.svg';
import { Link } from 'react-router-dom';
const SearchResults = ({ searchResults }) => {
  
  return (
    <div className="container mt-5">
      <div className="row">
        {searchResults.map((movie) => (
          <div key={movie.id} className="col-6 col-sm-6 col-md-3 col-lg-3 mt-3">
           <Link to={`/movies/${movie.id}`}>
            <div className="card h-100">
              <div style={{ position: 'relative' }}>
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
                <img
                  src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  alt={movie.title}
                  className='card-img-top'
                  data-testid='movie-poster'
                />
              </div>
              <div className="card-body">
                <p className="card-title" data-testid="movie-title">
                  <strong>{movie.title}</strong>
                </p>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className="card-text p-2">
                    <img src={imdb} alt="IMDb Logo" /> {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="card-text ya p-2">
                    {/* <img src={tomato} alt="Tomato Logo" /> {movie.percentage}% */}
                  </p>
                </div>
                <p className="card-text ya" data-testid="movie-release-date">
                  Release Date (UTC): {movie.release_date}
                </p>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
