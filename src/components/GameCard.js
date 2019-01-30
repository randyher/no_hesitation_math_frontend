import React from "react";

const GameCard = props => {
  const { game } = props;
  console.log("Hey");
  return (
    <div>
      <h1>{game.score}</h1>
    </div>
  );
};

export default GameCard;
