import React from "react";
import { AppRegistry, asset, Pano, Text, View } from "react-vr";
import text from "./text";

const textSplit = text.split(" ");

export default class VRTextReader extends React.Component {

  constructor() {
    super();

    this.timer = this.timer.bind(this);
    this.state = {
      currentCount: 0
    }
  }
  componentDidMount() {
    var intervalId = setInterval(this.timer, 200);
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  timer() {
    // setState method is used to update the state

    if (this.state.currentCount === textSplit.length) {
      clearInterval(this.state.intervalId);
    }
    else {
      this.setState({ currentCount: this.state.currentCount + 1 });
    }
  }

  render() {
    return (
      <View>
        <Text
          style={{
            fontSize: 0.8,
            fontWeight: "400",
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: "center",
            textAlignVertical: "center",
            transform: [{ translate: [0, 0, -3] }]
          }}
        >
          {textSplit[this.state.currentCount]}
        </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent("VRTextReader", () => VRTextReader);
