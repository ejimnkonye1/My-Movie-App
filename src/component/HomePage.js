import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

function HomePage() {
  const [topMovies, setTopMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = '1a4ccc89abfa206e97d2fc3f73b1e3e2';
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
    const genresApiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

    // Fetch genres first
    axios.get(genresApiUrl)
      .then((genresResponse) => {
        const genresData = genresResponse.data.genres;
        const genreMap = {};
        genresData.forEach((genre) => {
          genreMap[genre.id] = genre.name;
        });
        setGenres(genreMap);

        // Fetch top movies with genres
        axios.get(apiUrl)
          .then(async (response) => {
            const topMoviesData = response.data.results.slice(0, 10);

            // Fetch additional movie details for each movie
            const moviesWithDetails = await Promise.all(
              topMoviesData.map(async (movie) => {
                const movieApiUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`;
                const movieResponse = await axios.get(movieApiUrl);
                const { vote_average, vote_count, genres } = movieResponse.data;
                const rating = vote_average;
                const percentage = (vote_count / 10) * 100; // Adjust as needed
                const genreNames = genres.map((genre) => genre.name).join(', ');

                return { ...movie, rating, percentage, genreNames };
              })
            );

            setTopMovies(moviesWithDetails);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching top movies:', error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error('Error fetching genres:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5">
      
      <div className="row">
        <div className="col d-flex justify-content-between align-items-center">
          <h5 className="">Featured movies</h5>
          <a className='by' href='#'>See more</a>
        </div>
      </div>

      <div className="row">
        <div className="col">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="row">
              {topMovies.map((movie) => (
                <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3 mr-4">
                  <Link to={`/movies/${movie.id}`}>
                    <MovieCard movie={movie} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
