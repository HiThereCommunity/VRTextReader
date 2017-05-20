//@flow

import React from "react";

//$FlowFixMe
import { AppRegistry, asset, Pano, Text, View, VrButton, Image } from "react-vr";

import App from "./components/router";

type State = {
  currentCount: number,
  intervalId: number
};

export default class VRTextReader extends React.Component {

  render() {
    return (<App/>);
  }
}

AppRegistry.registerComponent("VRTextReader", () => VRTextReader);
