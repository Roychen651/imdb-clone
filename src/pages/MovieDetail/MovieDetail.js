import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetail.css";

const API_KEY = "2c2230d49faab60eaa90ea7262ab135e";
const START_ENDPOINT = "https://api.themoviedb.org/3/movie/";

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${START_ENDPOINT}${id}?api_key=${API_KEY}&language=en-US`
        );
        if (!response.ok) throw new Error("Failed to fetch movie details");
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (error) return <div className="movie">{error}</div>;
  if (!movie) return <div className="movie">Loading...</div>;

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt="Backdrop"
        />
      </div>
      <img
        className="movie__poster"
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt="Poster"
      />
      <div className="movie__info">
        <h1 className="movie__title">{movie.original_title}</h1>
        <p className="movie__tagline">{movie.tagline}</p>
        <p className="movie__details">
          {movie.runtime} mins | Release Date: {movie.release_date}
        </p>
        <div className="movie__genres">
          {movie.genres.map((genre) => (
            <span key={genre.id} className="movie__genre">
              {genre.name}
            </span>
          ))}
        </div>
        <p className="movie__overview">{movie.overview}</p>
        <div className="movie__links">
          {movie.homepage && (
            <a href={movie.homepage} target="_blank" rel="noreferrer">
              Official Site
            </a>
          )}
          {movie.imdb_id && (
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="_blank"
              rel="noreferrer"
            >
              IMDb Page
            </a>
          )}
        </div>
      </div>
      <div className="movie__production">
        {movie.production_companies.map(
          (company) =>
            company.logo_path && (
              <img
                key={company.id}
                src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                alt={company.name}
                title={company.name}
              />
            )
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
