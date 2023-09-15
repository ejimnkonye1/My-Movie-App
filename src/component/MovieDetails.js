// src/components/MovieDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import play from '../assets/Play.svg'


function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual TMDB API key
    const apiKey = '1a4ccc89abfa206e97d2fc3f73b1e3e2';
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

    axios
      .get(apiUrl)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
    <div className="container-fluid movie-details-container " >
    
      <div className="row">
        <div className="col-md-12">
        <div
  className="movie-image-container details"
  style={{
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`, // Use 'original' size
    backgroundSize: 'cover', // Adjust as needed
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    minHeight: '50vh',
    backgroundColor: 'rgb(0, 0, 0)',
    display: 'flex', // Enable flexbox
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  }}
>
  
  <div className="watch-trailer btn btn-danger">
    <img src={play} alt="Play Icon" /> {/* Add your icon here */}
    <span className="watch-trailer-text">Watch Trailer</span>
  </div>
</div>

        </div>
        <div className="col-md-12">
        <h2 className="movie-title" data-testid="movie-title">
            {movie.title}
          </h2>
          <p className="movie-release-date" data-testid="movie-release-date">
            Release Date(UTC): {movie.release_date}
          </p>
          <p className="movie-runtime" data-testid="movie-runtime">
            Runtime: {movie.runtime} minutes
          </p>
          <p className="movie-overview" data-testid="movie-overview">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
