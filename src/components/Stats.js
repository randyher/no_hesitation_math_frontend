import React from "react";
import Loading from "./Loading";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from "react-vis";

class Stats extends React.Component {
  render() {
    console.log(this.props);
    let i = 0;
    let y = 0;
    let timeData = this.props.data.map(game => {
      i++;
      return { x: i, y: game.time_remaining };
    });

    let scoreData = this.props.data.map(game => {
      y++;
      return { x: y, y: game.score };
    });

    return (
      <div>
        {!this.props.username ? (
          <Loading />
        ) : this.props.data.length > 0 ? (
          <div>
            <div class="split left">
              <div class="centered">
                <h1 className="timeHeading">Time Remaining</h1>
                <br />
                <XYPlot
                  className="timeGraph"
                  xType="ordinal"
                  width={600}
                  height={600}
                >
                  <VerticalGridLines />
                  <HorizontalGridLines />
                  <XAxis title="round" />
                  <YAxis title="seconds remaining" />
                  <VerticalBarSeries data={timeData} />
                </XYPlot>
              </div>
            </div>

            <div class="split right">
              <div class="centered">
                <h1 className="timeHeading">Score</h1>
                <br />
                <XYPlot
                  className="scoreGraph"
                  xType="ordinal"
                  width={600}
                  height={600}
                  color="purple"
                >
                  <VerticalGridLines />
                  <HorizontalGridLines />
                  <XAxis title="round" />
                  <YAxis title="questions correct" />
                  <VerticalBarSeries data={scoreData} />
                </XYPlot>
              </div>
            </div>
          </div>
        ) : (
          <h1>You must complete a sheet first!</h1>
        )}
      </div>
    );
  }
}

export default Stats;
