import React, { useEffect, useState } from "react";
import "./MoviesList.css";
import Card from "../Card/Card";
import { useParams } from "react-router-dom";

const API_KEY = "2c2230d49faab60eaa90ea7262ab135e";

const MoviesList = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  const getData = async () => {
    const endpoint = `https://api.themoviedb.org/3/movie/${
      type ? type : "popular"
    }?api_key=${API_KEY}&language=en-US`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setMovieList(data.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, [type]);

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
