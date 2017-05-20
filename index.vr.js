// @flow

import React from "react";
import { AppRegistry, asset, Pano, Text, View } from "react-vr";
import SpeakerList from "./speakerList";

export default class VRTextReader extends React.Component {

  render() {
    return (
      <SpeakerList />
    )
  }
}

AppRegistry.registerComponent("VRTextReader", () => VRTextReader);
