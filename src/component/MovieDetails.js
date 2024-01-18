// src/components/MovieDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import play from '../assets/Play.svg'
import logo from '../assets/Logo.svg';
import '../css/details.css'

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState(null);
  const [activeItem, setActiveItem] = useState('Movies');

  const handleItemHover = (itemName) => {
    setActiveItem(itemName);
  };
  useEffect(() => {
    const apiKey = '1a4ccc89abfa206e97d2fc3f73b1e3e2';
    const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
    const videosUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`;

    // Fetch movie details
    axios
      .get(movieUrl)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);

        // Fetch trailer key
        axios.get(videosUrl)
          .then((videosResponse) => {
            const trailer = videosResponse.data.results.find(video => video.type === 'Trailer');
            if (trailer) {
              setTrailerKey(trailer.key);
            }
          })
          .catch((videosError) => {
            console.error('Error fetching movie videos:', videosError);
          });
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }
  const ratingOutOf10 = movie.vote_average;
  const genres = movie.genres.map((genre) => (
    <li key={genre.id} className='list-inline-item borders text-center text-danger mr-2'>{genre.name}</li>
  ));

  return (
    <div className="container-fluid movie-details-container " >
    
      <div className="row">
      <div className='col-md-2 round-bod  '>
        
      <div className='custom-card'>
        {/* Add logo */}
        <img src={logo} alt='Logo' style={{width:'100%'}} color='red' className='card-img-top det-log' /> 

        <div className='card-body'>
          {/* Navigation links */}
          <ul className='custom-nav'>
      <li className={`custom-item ${activeItem === 'Home' ? 'active' : ''}`} onMouseOver={() => handleItemHover('Home')}>
        <a href='' className='custom-link'>
          <i className='fas fa-home'></i> <span>Home</span>
        </a>
      </li>
      <li className={`custom-item ${activeItem === 'Movies' ? 'active' : ''}`} onMouseOver={() => handleItemHover('Movies')} >
        <a href='#' className='custom-link'>
          <i className='fas fa-film'></i><span>Movies</span>
        </a>
      </li>
      <li className={`custom-item ${activeItem === 'TV Series' ? 'active' : ''}`} onMouseOver={() => handleItemHover('TV Series')}>
        <a href='#' className='custom-link'>
          <i className='fas fa-tv'></i> <span>TV Series</span>
        </a>
      </li>
      <li className={`custom-item ${activeItem === 'Upcoming' ? 'active' : ''}`} onMouseOver={() => handleItemHover('Upcoming')}>
        <a href='#' className='custom-link'>
          <i className='fas fa-arrow-right'></i><span>Upcoming</span>
        </a>
      </li>
    </ul>

      
          
        </div>
        <div className='col-md-12'>
      <div className='card round-card rounded'>
  
        
        <div className='card-body'>
          <p className='card-title'>Play Movie Quizzes and Earn Free Tickets</p>
        
        
            <small className='list-group-item'>50k people are playing now</small>
          
          <div className='d-flex justify-content-center'>
          <button className='btn btn-sm btn-danger mt-3'>Start Playing</button>
       </div>
        </div>
      </div>
    </div>
    <ul>
      <li className='custom-item mt-2'>
      <a className='custom-nav'>
            <i className='fas fa-sign-out-alt'></i> <span>Log Out</span>
          </a>
      </li>
    </ul>
 
      </div>
    </div>
    
        <div className="col-md-10">
       
        <div className="movie-image-container details mt-3 card rounded"
  style={{
    position: 'relative',
    width: '100%',
    height: '310px',
    backgroundColor: 'rgb(0, 0, 0)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  {movie && (
    <div className="movie-trailer-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${trailerKey}`}
        title="Movie Trailer"
        frameBorder="0"
        allowFullScreen
        style={{ borderRadius: '8px' }} // Add border radius or other styles as needed
      />
    </div>
  )}





  
  <div className="watch-trailer btn btn-danger">
    <img src={play} alt="Play Icon" /> {/* Add your icon here */}
    <span className="watch-trailer-text">Watch Trailer</span>
  </div>
</div>
<div className="col-md-12">
<div className="container">
      <div className="row">
        <div className='col-md-9'>
          <div className="movie-details d-flex" data-testid="movie-details">
            <h6 className="movie-title mt-2">{movie.title}</h6>
            <ul className='item'>
              <li className='items'>
              <h6 className="movie-release-year mt-2">{new Date(movie.release_date).getFullYear()}</h6>
              </li>
              <li className='items'>
              <h6 className="movie-runtime mt-2">{`${Math.floor(movie.runtime / 60)} hours`}</h6>

              </li>
              
            </ul>
            <ul className='list-inline'>{genres}</ul>
            {/* <div className='borders ml-3'>Drama</div> */}
          </div>

          <p className="movie-overview " data-testid="movie-overview">
            {movie.overview}
          </p>
          <h6 className=''>Director: <span className='text-danger'>Joseph Kosinski</span></h6>
          <h6 className=''>Writer:<span className='text-danger'> Jim cash, Jack Epss, Peter Crag</span></h6>
          
        </div>

        <div className='col-md-3'>
          {/* Movie Rating */}
          <div className='movie-rating  float-end'>
            <i className='fas fa-star'></i> {ratingOutOf10.toFixed(1)}  | {movie.vote_count}K
          </div>

          {/* Showtime Button */}
          <button className='btn btn-danger mt-2 show'>
            <i className='fas fa-clock'></i> See Showtime
          </button>

          {/* More Watch Options */}
          <div className='more-watch-options mt-2'>
        
            <button className='btn btn-secondary show'>
              <i className='fas fa-list-alt'></i> More Watch Options
            </button>
          </div>

          {/* Small Movie Card */}
          <div className='card mt-2 '>
            <div
            
             className='card-img-top'
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`, // Use 'original' size
              backgroundSize: '100% 100% ', // Adjust as needed
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              width: '100%', // Set the width of your container
              height: '105px',
              
              backgroundColor: 'rgb(0, 0, 0)',
           
            }}
            />
           
          </div>
        </div>
      </div>
    </div>
    </div>
       
        </div>
       
      </div>
    </div>
  );
}

export default MovieDetails;
