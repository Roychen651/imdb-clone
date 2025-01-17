import React, { useEffect, useState } from "react";
import "./MoviesList.css";
import Card from "../Card/Card";
import { useParams } from "react-router-dom";

const API_KEY = "2c2230d49faab60eaa90ea7262ab135e";

const MoviesList = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [type]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        type ? type : "popular"
      }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovieList(data.results));
  };

  return (
    <div className="movie_list">
      <h2 className="list_title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="list_cards">
        {movieList.map((movie) => (
          <Card movie={movie} />
        ))}
      </div>
    </div>
  );
};
export default MoviesList;
