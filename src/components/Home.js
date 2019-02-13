import React from "react";
import Loading from "./Loading";
import YoutubeBackground from "react-youtube-background";

class Home extends React.Component {
  render() {
    return (
      <YoutubeBackground
        videoId={"8cR_1Qi-tP4"}
        aspectRatio={"16:9"}
        overlay={"rgba(255,255,255,.5)"}
        className={"video-background"}
      >
        <div className="theHome" />
      </YoutubeBackground>
    );
  }
}

export default Home;
