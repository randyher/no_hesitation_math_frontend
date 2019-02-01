import React from "react";

const GameCard = props => {
  const { game } = props;

  return (
    <div class="card" onClick={() => props.displayResults(game)}>
      <div class="content">
        <div class="header">NHM {props.num}</div>
        <div class="meta">
          <a>Results</a>
        </div>
        <div class="description">Questions Correct: {game.score}</div>
        <div class="description">Time Remaining: {game.time_remaining}</div>
      </div>
    </div>
  );
};

export default GameCard;
