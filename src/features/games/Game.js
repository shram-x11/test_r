import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";
import { selectGame } from "./gamesSlice";
import styled from "styled-components";
import { Link } from "react-router-dom";

const GameBlock = styled.div`
  width: 100%;
  height: 500px;
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

export function Game() {
  let { id, id2 } = useParams();
  const games = useSelector(
    (state) => selectGame(state, id, id2),
    shallowEqual
  );
  const [gamesState, setGamesState] = useState([]);

  useEffect(() => {
    setGamesState(games);
  }, [games]);

  const renderGames = useMemo(
    () =>
      gamesState.map((game) => (
        <GameBlock key={game.key}>
            <img src={`https://cdn2.softswiss.net/i/s2/${game.key}.png`} />
        </GameBlock>
      )),
    [gamesState]
  );

  return (
    <Wrapper>
      <Link to="/">
        <button>Back</button>
      </Link>
      <GameWrapper>{renderGames}</GameWrapper>
    </Wrapper>
  );
}
