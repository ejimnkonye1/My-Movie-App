// NowPlaying.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import play from '../assets/Play.svg'
import imdb from '../assets/imdb.svg'
import tomato from '../assets/tomato.svg'

import HomePage from './HomePage';

function NowPlaying() {
  const [randomMovie, setRandomMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual TMDB API key
    const apiKey = '1a4ccc89abfa206e97d2fc3f73b1e3e2';
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;

    axios
      .get(apiUrl)
      .then((response) => {
        const movies = response.data.results;
        const randomIndex = Math.floor(Math.random() * movies.length);
        setRandomMovie(movies[randomIndex]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching now playing movies:', error);
        setError('An error occurred while fetching data.');
        setLoading(false);
      });
      
  }, []);
  const calculatePercentage = (rating) => {
    return (rating / 10) * 100;
  }
  return (
    <section>
    <div>
      <div
        className="background-movie"
        style={{
          backgroundImage: randomMovie
            ? `url(https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path})`
            : 'none',
        }}
      >
        
        <div className="container ">
          
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
                <div className='container  '>
                  <div className='row' >
                    <div className='col-md-6'>
              <h2 className='text-white'>{randomMovie.title}</h2>
              <div className='d-flex justify-content-right '>
              <p className='text-white p-2'><img src={imdb} /> {randomMovie.vote_average}</p>
               <p className='text-white p-2 '><img src={tomato} />   {calculatePercentage(randomMovie.vote_average)}%</p>
               </div>
              <p className='text-white'>{randomMovie.overview}</p>
              </div>
              </div>
              </div>

              <a className='btn btn-danger'> <img src={play} /> Watch trailer</a>
            </>
          )}
        </div>
      </div>
      
    </div>
    
    </section>
  );
}

export default NowPlaying;
