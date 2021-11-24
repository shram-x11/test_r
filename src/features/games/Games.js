import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProviders,
  selectReals,
  selectGames,
  setFilterProvider,
  setFilterReals,
  incrementPage,
} from "./gamesSlice";
import styled from "styled-components";
import { Link } from "react-router-dom";

const GameBlock = styled.div`
  width: 30%;
  height: 200px;
  padding: 20px;
  background: #ccc;
  float: left;
`;

const GameWrapper = styled.div`
  overflow: auto;
  width: 100%;
`;
const Wrapper = styled.div`
  width: 100%;
`;

export function Games() {
  const games = useSelector(selectGames);
  const providers = useSelector(selectProviders);
  const reals = useSelector(selectReals);

  const dispatch = useDispatch();
  const [gamesState, setGamesState] = useState([]);

  useEffect(() => {
    setGamesState(games);
  }, [games]);

  const renderSelectProviders = useMemo(
    () => (
      <select onChange={(e) => dispatch(setFilterProvider(e.target.value))}>
        <option value="">Provider</option>
        {providers.map((provider) => (
          <option key={provider} value={provider}>
            {provider}
          </option>
        ))}
      </select>
    ),
    [providers]
  );

  const renderSelectReals = useMemo(
    () => (
      <select onChange={(e) => dispatch(setFilterReals(e.target.value))}>
        <option value="">Reals</option>
        {reals.map((real) => (
          <option key={real} value={real}>
            {real}
          </option>
        ))}
      </select>
    ),
    [reals]
  );

  const renderGames = useMemo(
    () =>
      gamesState.map((game) => (
        <GameBlock key={game.key}>
          <Link to={`game/${game.key}`}>
            <img src={`https://cdn2.softswiss.net/i/s2/${game.key}.png`} />
          </Link>
        </GameBlock>
      )),
    [gamesState]
  );

  return (
    <Wrapper>
      {renderSelectProviders}
      {renderSelectReals}
      <GameWrapper>{renderGames}</GameWrapper>
      <button onClick={() => dispatch(incrementPage())}>load more</button>
    </Wrapper>
  );
}
