//@flow

import React from "react";


import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
  Image
  //$FlowFixMe
} from "react-vr";
import text from "../text";
import { splitText } from "../utils";



type State = {
  currentCount: number,
  intervalId: number,
  textArray: Array<string>,
  start: boolean
};

type Props = {
  backPressed: () => void,
  description: string
};

export default class VRTextReader extends React.Component {
  state: State;
  props: Props;
  timer: {};

  constructor(props: Props) {
    super(props);

    //$FlowFixMe
    this._timer = this._timer.bind(this);
    //$FlowFixMe
    this._start = this._start.bind(this);

    this.state = {
      currentCount: 0,
      intervalId: 0,
      textArray: splitText(props.description),
      start: false
    };
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  _start() {
    const intervalId = setInterval(this._timer, 200);
    this.setState({ intervalId, start: true });
  }

  _pauze() {
    if (this.state.intervalId !== 0) clearInterval(this.state.intervalId);
    this.setState({ start: false, intervalId: 0 });
  }

  _reset() {
    if (this.state.intervalId !== 0) clearInterval(this.state.intervalId);
    this.setState({ start: false, currentCount:0 , intervalId: 0});
  }

  _timer() {
    const { currentCount, textArray, start } = this.state;
    if (currentCount < textArray.length - 1 && start) {
      this.setState({ currentCount: this.state.currentCount + 1 });
    }
    else {
      if (this.state.intervalId) clearInterval(this.state.intervalId);
      this.setState({ start: false, currentCount: 0 });
    }
  }

  render() {
    return (
      <View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          width: 5,
          alignItems: "stretch",
          transform: [{ translate: [-1, 1, -5] }],
          marginBottom: 0.1
        }}
      >
      <VrButton
        style={{ flex: 1, height: 0.3, backgroundColor: "green", marginRight: 0.1 }}
        onClick={this._start}
      >
        <Text style={{ fontSize: 0.2, textAlign: "center" }}>Start</Text>
      </VrButton>
      <VrButton
        style={{ flex: 1, height: 0.3, backgroundColor: "grey", marginRight: 0.1 }}
        onClick={this._pauze}
      >
        <Text style={{ fontSize: 0.2, textAlign: "center" }}>Stop</Text>
      </VrButton>
      <VrButton
        style={{ flex: 1, height: 0.3, backgroundColor: "red" }}
        onClick={this._reset}
      >
        <Text style={{ fontSize: 0.2, textAlign: "center" }}>Reset</Text>
      </VrButton>
      </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            width: 5,
            alignItems: "stretch",
            transform: [{ translate: [-1, 1, -5] }]
          }}
        >
          <View style={{ marginBottom: 0.1, height: 1.6, width: 5, backgroundColor: "white" }}>
            <Text
              style={{
                fontSize: 0.8,
                fontWeight: "400",
                paddingLeft: 0.2,
                paddingRight: 0.2,
                textAlign: "center",
                textAlignVertical: "center",
                color: "black"
              }}
            >
              {this.state.textArray[this.state.currentCount]}
            </Text>
          </View>
          <VrButton
            style={{ width: 1.7, height: 0.3, backgroundColor: "grey" }}
            onClick={this.props.backPressed}
          >
            <Text style={{ fontSize: 0.2, textAlign: "center" }}>Back</Text>
          </VrButton>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent("VRTextReader", () => VRTextReader);
