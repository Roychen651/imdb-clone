import React, { useEffect, useState } from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import MoviesList from "../../components/MoviesList/MoviesList";

const API_KEY = "2c2230d49faab60eaa90ea7262ab135e";
const API_POPULAR = "https://api.themoviedb.org/3/movie/popular";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetch(`${API_POPULAR}?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setPopularMovies(data.results));
  }, []);

  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {popularMovies.map((movie) => (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/movie/${movie.id}`}
            >
              <div className="poster_image">
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    movie && movie.backdrop_path
                  }`}
                ></img>
              </div>
              <div className="poster_image_overlay">
                <div className="poster_image_overlay_title">
                  {movie && movie.title}
                </div>
                <div className="poster_image_overlay_runtime">
                  {movie && movie.release_date}
                  <span className="poster_image_overlay_rating">
                    {movie && movie.vote_average}
                    <i class="fas fa-star" />{" "}
                  </span>
                </div>
                <div className="poster_image_overlay_description">
                  {movie && movie.overview}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
        <MoviesList />
      </div>
    </>
  );
};

export default Home;
