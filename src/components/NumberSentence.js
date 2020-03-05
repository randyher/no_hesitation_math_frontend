import React from "react";

class NumberSentence extends React.Component {
  state = { timer: 60 };

  changeHandler = e => {
    let numberSentence = e.target.name + " " + e.target.value;
    let id = e.target.id;

    this.setState({
      [id]: numberSentence
    });
  };

  componentDidMount() {
    this.myInterval = setInterval(() => {
      //
      if (this.state.timer === 0) {
        this.props.timeOutHandler(this.state);
      }

      //
      this.setState(prevState => ({
        timer: prevState.timer - 1
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  renderQuestions = () => {
    let inputFields = [];
    let i = 0;
    while (i < 24) {
      inputFields.push(
        <div key={i} className="col-6 col-sm-4">
          <div className="label">{this.props.questions[i]}</div>
          <input
            className="text-box"
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
        <h1 style={this.state.timer <= 10 ? { color: "red" } : null}>
          {this.state.timer}
        </h1>
        <form onSubmit={e => this.props.submitHandler(e, this.state)}>
          <div className="row">{this.renderQuestions()}</div>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default NumberSentence;
