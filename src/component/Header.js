import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import logo from '../assets/Logo.svg';
import menu from '../assets/Menu.svg';
import searchIcon from '../assets/Search.svg';
import loveIcon from '../assets/Favorite.svg';
import imdb from '../assets/imdb.svg';
import tomato from '../assets/tomato.svg';
import backgroundImg from '../assets/Poster.png'
import HomePage from './HomePage';
import SearchResults from './searchresult';
import Layout from './layout';
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
      const nowPlayingUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
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
      <div className=''>
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
        <div className="navbar-brad">
        <a href="/">
          <img src={logo} alt="Logo" className='logos' />
          </a>
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
            <a className="nav-link sign" href="#" style={{ marginLeft: '30px' }}>
              Signup
            </a>
          </li>
          <li className="nav-item p-2">
            <img src={menu} alt="Menu" className='menus' />
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
                {/* <p className='d-flex'  style={{ marginLeft: '10px' }}>
                  <img src={tomato} alt="Tomato Logo" />  
                </p> */}
              </div>
              <p>{selectedMovie.overview}</p>
            
              <Link to={`/movies/${selectedMovie.id}`}>
          <a className="btn btn-danger mt-5 mb-4">Watch trailer</a>
        </Link>
            </div>
          </div>
        </div>
      )}
      
  
            </>
           
 </div>
 <Layout />
 </div>

        
         ) : (
          <div className="header">
  
            
    <div className='header'>
    <nav className="navbar navbar-expand-lg navbar-light bg-dark "  >
      <div className="container">
     
        <div className="navbar-brad">
        <a href="/">
          <img src={logo} alt="Logo" className='logos' />
         </a>
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
                color: 'white' , // Set the placeholder text color to white
              },
            }}
            disabled={loading}
          />
        </div>
        <ul className="navbar-nav ">
          <li className="nav-item p-2 ">
            <a className="nav-link text-white sign" href="#" style={{marginLeft:'30px'}} >
               Signup
            </a>
          </li>
          <li className="nav-item p-2">
            <img src={menu} alt="Menu" className='menus' />
          </li>
        </ul>
      </div>
      
    </nav>
          {loading && <p>Loading...</p>}
          <SearchResults searchResults={searchResults} />
        </div>
         
    
          </div>
          
            )}
          
        </div>
        
  );
}

export default Header;