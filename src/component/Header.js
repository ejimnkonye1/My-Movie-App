import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/Logo.svg';
import menu from '../assets/Menu.svg';
import searchIcon from '../assets/Search.svg';
import loveIcon from '../assets/Favorite.svg';
import imdb from '../assets/imdb.svg';
import tomato from '../assets/tomato.svg';
import backgroundImg from '../assets/Poster.png'
import HomePage from './HomePage';

function Header() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBackgroundImage, setShowBackgroundImage] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const getRandomBackground = async () => {
    try {
      const apiKey = '1a4ccc89abfa206e97d2fc3f73b1e3e2';
      const nowPlayingUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
      const response = await axios.get(nowPlayingUrl);
      const movies = response.data.results;
      const randomIndex = Math.floor(Math.random() * movies.length);
      const randomMovie = movies[randomIndex];

      setBackgroundImage(`https://image.tmdb.org/t/p/w1280${randomMovie.backdrop_path}`);
      setSelectedMovie(randomMovie);
    } catch (error) {
      console.error('Error fetching random background image:', error);
    }
  };

  useEffect(() => {
    getRandomBackground();
  }, []);

  const handleSearch = () => {
    const apiKey = '1a4ccc89abfa206e97d2fc3f73b1e3e2';
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}`;

    setLoading(true);
    setShowBackgroundImage(false);
    
    axios
      .get(apiUrl)
      .then((response) => {
        setSearchResults(response.data.results.slice(0, 10));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setLoading(false);
      });
  };
  return (
    <div>
    {showBackgroundImage ? (
  <div className="header" style={{ 
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    backgroundColor: 'rgb(0, 0, 0)',
  }}>
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <div className="navbar-brand">
          <img src={logo} alt="Logo" />
        </div>
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <input
            type="text"
            className="form-control search-input border"
            placeholder="What do you want to watch..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            style={{
              fontSize: '',
              padding: '10px 15px',
              width: '50%',
              marginRight: '30px',
              borderRight: 'none',
              borderLeft: 'none',
              borderTop: 'none',
              borderBottom: 'none',
              outline: 'none',
              textDecoration: 'none',
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
            }}
          />
        </div>
        <ul className="navbar-nav">
          <li className="nav-item p-2">
            <a className="nav-link" href="#" style={{ marginLeft: '30px' }}>
              Signup
            </a>
          </li>
          <li className="nav-item p-2">
            <img src={menu} alt="Menu" />
          </li>
        </ul>
      </div>
    </nav>

   <>
   {/* Display movie details */}
   {selectedMovie && (
        <div className="container movie-con ">
          <div className="row">
            <div className="col-md-6 text-white mt-4">
              <h2 className=''>{selectedMovie.title}</h2>
              <div className="d-flex justify-content-right">
                <p>
                  <img src={imdb} alt="IMDb Logo" /> {selectedMovie.vote_average}
                </p>
                <p>
                  <img src={tomato} alt="Tomato Logo" />  %
                </p>
              </div>
              <p>{selectedMovie.overview}</p>
              <a className="btn btn-danger mt-5">Watch trailer</a>
            </div>
          </div>
        </div>
      )}
    
  
            </>



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
                          
                        />
                      </div>
                      <div className="card-body">
            <p className="card-title" >
              <strong>{movie.title}</strong>
            </p>
            <div className='d-flex justify-content-between align-items-center'>
              <p className="card-text p-2">
                <img src={imdb} alt="IMDb Logo" /> {movie.rating}
              </p>
              <p className="card-text ya p-2" >
                <img src={tomato} alt="Tomato Logo" /> {movie.percentage}%
              </p>
            </div>
            <p className="card-text ya" >
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
         ) : (
          <div className="header">
            {/* Your content without the background image */}
            {/* Add your non-background content here */}
            
    <div className='header'>
    <nav className="navbar navbar-expand-lg navbar-light bg-dark "  >
      <div className="container">
        <div className="navbar-brand">
          <img src={logo} alt="Logo" />
        </div>
        <div className="d-flex justify-content-center align-items-center  flex-grow-1">
          <input
            type="text"
            className="form-control search-input border"
            placeholder="What do you want to watch..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
           
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            style={{
              fontSize: '',
              padding: '10px 15px',
              width: '50%', // Use 100% width to fill the available space
              marginRight: '30px',
              borderRight: 'none',
              borderLeft: 'none',
              borderTop : 'none',
              borderBottom : 'none',
              outline : 'none',
              textDecoration: 'none',
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
              
              '::placeholder': {
                color: 'white', // Set the placeholder text color to white
              },
            }}
            disabled={loading}
          />
        </div>
        <ul className="navbar-nav ">
          <li className="nav-item p-2 ">
            <a className="nav-link text-white" href="#" style={{marginLeft:'30px'}} >
               Signup
            </a>
          </li>
          <li className="nav-item p-2">
            <img src={menu} alt="Menu" />
          </li>
        </ul>
      </div>
      
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
              <p className="card-text p-2" >
                <img src={imdb} alt="IMDb Logo" /> {movie.rating}
              </p>
              <p className="card-text ya p-2" >
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
         
    
          </div>
          
            )}
        </div>
        
  );
}

export default Header;