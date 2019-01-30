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
      <div className="homePage">
        <h1>Log In</h1>

        <br />

        <form onSubmit={e => this.props.handleSubmit(e, this.state)}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
          />

          <br />
          <br />

          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <br />
          <br />

          <input type="submit" value="Log In!" />
        </form>
      </div>
    );
  }
}

export default LogIn;
