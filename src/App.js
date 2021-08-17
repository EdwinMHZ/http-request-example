import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const fecthMoviesHandler = useCallback(

    async () => {

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://swapi.dev/api/films');

        if (!response.ok) {
          throw new Error('Something went wrong!!');
        }

        const data = await response.json();

        const transformedMovies = data.results.map(movie => {
          return {
            id: movie.episode_id,
            title: movie.title,
            openingText: movie.opening_crawl,
            releaseDate: movie.release_date
          }
        })
        setMovies(transformedMovies);

      } catch (error) {
        setError(error.message)
      }
      setIsLoading(false);
      /* fetch('https://swapi.dev/api/films')
        .then(res => {
          return res.json();
        }).then(data => {
          const transformedMovies = data.results.map( movie => {
            return {
              id:movie.episode_id,
              title: movie.title,
              openingText: movie.opening_crawl,
              releaseDate: movie.release_date
            }
          })
          setMovies(transformedMovies);
        }); */
    }
    ,
    [],
  )

  useEffect(() => {
    fecthMoviesHandler();
    /* return () => {
      cleanup
    } */
  }, [fecthMoviesHandler])

  return (
    <React.Fragment>
      <section>
        <button onClick={fecthMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
