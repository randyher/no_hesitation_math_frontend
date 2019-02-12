import React from "react";

class LogIn extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    let name = e.target.name;
    let val = e.target.value;
    this.setState({
      [name]: val
    });
  };
  render() {
    return (
      <div className="loginPage">
        <br />
        <h1>Log In</h1>

        <br />

        <form
          className="ui form"
          onSubmit={e => this.props.handleSubmit(e, this.state)}
        >
          <div className="ui field">
            <input
              type="text"
              name="username"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>

          <div className="ui field">
            <input
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <br />

          <input className="ui button" type="submit" value="Log In!" />
        </form>
      </div>
    );
  }
}

export default LogIn;
