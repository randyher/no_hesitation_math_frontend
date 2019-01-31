import React from "react";
import GameCard from "../components/GameCard";

class GameContainer extends React.Component {
  render() {
    let i = 0;
    const allGames = this.props.games.map(game => {
      i++;
      return <GameCard key={game.id} game={game} num={i} />;
    });

    return (
      <div>
        <br />
        <h1>Welcome {this.props.username}!</h1>
        <br />
        <div className="ui link cards">{allGames}</div>
      </div>
    );
  }
}

export default GameContainer;
