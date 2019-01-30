import React from "react";
import GameCard from "../components/GameCard";

const GameContainer = props => {
  const allGames = props.games.map(game => {
    return <GameCard game={game} />;
  });

  return (
    <div>
      <h1>{allGames}</h1>
    </div>
  );
};

export default GameContainer;
