import React from "react";
import GameCard from "../components/GameCard";
import ResultsPage from "../components/ResultsPage";

class GameContainer extends React.Component {
  state = {
    displayResults: false,
    currentGame: {}
  };

  displayResults = game => {
    let fullGame = this.props.allGames.find(allgame => {
      return allgame.id == game.id;
    });

    console.log(fullGame);

    this.setState({
      displayResults: !this.state.displayResults,
      currentGame: fullGame
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

        {this.state.displayResults ? (
          <ResultsPage results={this.state.currentGame} />
        ) : (
          <div className="ui link cards">{allGames}</div>
        )}
      </div>
    );
  }
}

export default GameContainer;
