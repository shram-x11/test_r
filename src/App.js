import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getGames } from "./features/games/gamesSlice";
import logo from "./logo.svg";
import { Games } from "./features/games/Games";
import { Game } from "./features/games/Game";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Games />} />
            <Route path="/game/:id/:id2" element={<Game />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
