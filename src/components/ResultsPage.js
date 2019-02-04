import React from "react";

class ResultsPage extends React.Component {
  displaySentence = () => {
    let compiled = [];
    this.props.results.problems.forEach(numberSentence => {
      compiled.push(
        <div className="col-6 col-sm-4">{numberSentence.number_sentence}</div>
      );
    });
    return compiled;
  };
  render() {
    console.log(this.props.results);
    return (
      <div>
        <h4 className="correct">Correct: {this.props.results.score}</h4>
        <h4>Time Left: {this.props.results.time_remaining} seconds</h4>
        <br />
        <div className="row">{this.displaySentence()}</div>
      </div>
    );
  }
}

export default ResultsPage;
