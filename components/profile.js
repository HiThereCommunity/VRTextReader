//@flow

import React, { Component } from "react";
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

import { type Speaker } from "../query";
const defaultURL = "https://facebook.github.io/react/img/logo_og.png";


type Props = {
  speaker: Speaker
}


export default class ViewColoredBoxesWithText extends Component {
  props: Props;

  render() {
    const { avatarUrl, name } = this.props.speaker;

    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            width: 5,
            alignItems: "stretch",
            transform: [{ translate: [-1, 1, -5] }]
          }}
        >
          <View style={{ marginRight: 1, height: 2, width: 2, backgroundColor: "white" }}>
            <Image source={{ uri: avatarUrl }} style={{ width: 2, height: 2 }}/>
          </View>
          <View
            style={{ width: 2, height: 2, backgroundColor: "grey" }}
          >
            <Text style={{ fontSize: 0.2, textAlign: "center" }}>{name}</Text>
          </View>
        </View>
      </View>
    );
  }
}
