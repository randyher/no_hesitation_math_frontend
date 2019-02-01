import React from "react";
import GameCard from "../components/GameCard";

class GameContainer extends React.Component {
  state = {
    displayResults: false,
    currentGame: ""
  };

  displayResults = game => {
    console.log(game.problems);
    this.setState({
      currentGame: game
    });
  };

  render() {
    let i = 0;
    const allGames = this.props.games.map(game => {
      i++;
      return (
        <GameCard
          key={game.id}
          game={game}
          num={i}
          displayResults={this.displayResults}
        />
      );
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
