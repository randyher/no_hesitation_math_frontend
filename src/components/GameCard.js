import React from "react";

const GameCard = props => {
  const { game } = props;

  return (
    <div className="card" onClick={() => props.displayResults(game)}>
      <div className="content">
        <div className="header">NHM {props.num}</div>
        <div className="meta">
          <a>Results</a>
        </div>
        <div className="description">Questions Correct: {game.score}</div>
        <div className="description">Time Remaining: {game.time_remaining}</div>
      </div>
    </div>
  );
};

export default GameCard;
