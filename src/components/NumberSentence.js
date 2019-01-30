import React from "react";

class NumberSentence extends React.Component {
  state = {};
  //
  // componentDidMount() {
  //   this.myInterval = setInterval(() => {
  //     //
  //     if (this.state.timer === 0) {
  //     }
  //     //
  //     this.setState(prevState => ({
  //       timer: prevState.timer - 1
  //     }));
  //   }, 1000);
  // }

  changeHandler = e => {
    let numberSentence = e.target.name + " " + e.target.value;
    let id = e.target.id;

    this.setState({
      [id]: numberSentence
    });
  };

  renderQuestions = () => {
    let inputFields = [];
    let i = 0;
    while (i < 24) {
      inputFields.push(
        <div key={i}>
          <div className="label">{this.props.questions[i]}</div>
          <input
            type="number"
            id={i}
            name={this.props.questions[i]}
            value={this.state.i}
            onChange={this.changeHandler}
          />
        </div>
      );
      i++;
    }
    return inputFields;
  };

  render() {
    return (
      <div>
        <h4>{this.state.timer}</h4>
        <form onSubmit={e => this.props.submitHandler(e, this.state)}>
          {this.renderQuestions()}
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default NumberSentence;
