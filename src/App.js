import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import MoviesList from "./components/MoviesList/MoviesList";
import MovieDetail from "./pages/MovieDetail/MovieDetail";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="movie/:id" element={<MovieDetail />}></Route>
          <Route path="movies/:type" element={<MoviesList />} />
          <Route path="/*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
