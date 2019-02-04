import React from "react";

class ResultsPage extends React.Component {
  displaySentence = () => {
    let shoot = [];
    this.props.results.problems.map(numberSentence => {
      shoot.push(
        <div className="col-6 col-sm-4">{numberSentence.number_sentence}</div>
      );
    });
    return shoot;
  };
  render() {
    return <div className="row">{this.displaySentence()}</div>;
  }
}

export default ResultsPage;
