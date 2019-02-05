import React from "react";
import ReactLoading from "react-loading";
import { Spinner } from "reactstrap";

class Loading extends React.Component {
  render() {
    return (
      <div>
        <Spinner
          style={{ "margin-top": "10%", width: "8rem", height: "8rem" }}
          color="primary"
        />
      </div>
    );
  }
}

export default Loading;
