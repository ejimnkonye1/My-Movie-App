// src/components/Search.js
import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/Logo.svg';
import searchIcon from '../assets/Search.svg';
import menu from '../assets/Menu.svg';
import loveIcon from '../assets/Favorite.svg';
import imdb from '../assets/imdb.svg';
import tomato from '../assets/tomato.svg';


function Search() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    // Replace 'YOUR_API_KEY' with your actual TMDB API key
    const apiKey = '1a4ccc89abfa206e97d2fc3f73b1e3e2';
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}`;

    setLoading(true);

    axios
      .get(apiUrl)
      .then((response) => {
        setSearchResults(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setLoading(false);
      });
  };

  return (
    <div>
      
   <nav className="navbar navbar-expand-lg " style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="navbar-brand">
            <img src={logo} alt="Logo" />
          </div>

          <div className="d-flex justify-content-center align-items-center">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search by title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
             
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              style={{ fontSize: '18px', padding: '10px 15px',width:'600'  }} 

              disabled={loading}

            />
          </div>
          <div className="user-actions">
            <a className="">Sign In</a>
          </div>
        </div>
        <img src={menu} alt="Menu" />
      </nav>
      {loading && <p>Loading...</p>}
      {!loading && searchResults.length === 0  }
      {!loading && searchResults.length > 0 && (
        <div className="container mt-5">
          <div className="row">
            {searchResults.map((movie) => (
              <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-4 mt-3">
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
          <p className="card-text p-2" data-testid="movie-rating">
            <img src={imdb} alt="IMDb Logo" /> {movie.rating}
          </p>
          <p className="card-text ya p-2" data-testid="movie-percentage">
            <img src={tomato} alt="Tomato Logo" /> {movie.percentage}%
          </p>
        </div>
        <p className="card-text ya" data-testid="movie-release-date">
          Release Date (UTC): {movie.release_date}
        </p>
      </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
