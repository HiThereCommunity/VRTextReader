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
import dateFormatter from "./formatCustomDate";

import { type Speaker } from "../query";
const defaultURL = "https://facebook.github.io/react/img/logo_og.png";


type Props = {
  speaker: Speaker
}


export default class ViewColoredBoxesWithText extends Component {
  props: Props;

  render() {
    const { avatarUrl, name, talks } = this.props.speaker;

    let highlighted = {
      fontWeight: "500"
    }
    return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            width: 5,
            alignItems: "stretch",
            transform: [{ translate: [-3, 2, -5] }],
            marginBottom: 0.1
          }}
        >
          <View style={{ marginRight: 0.2, height: 2, width: 2 }}>
            <Image source={{ uri: avatarUrl }} style={{ width: 2, height: 2 }}/>
          </View>
          <View
            style={{ width: 3, height: 2}}
          >
            <Text style={[{ fontSize: 0.2, textAlign: "left" }, highlighted]}>Name:</Text>
            <Text style={{ fontSize: 0.2, textAlign: "left", marginBottom: 0.1 }}>{name}</Text>
            <Text style={[{ fontSize: 0.2, textAlign: "left" }, highlighted]}>Talk:</Text>
            <Text style={{ fontSize: 0.2, textAlign: "left" }}>{talks[0].title}</Text>
            <Text style={[{ fontSize: 0.2, textAlign: "left" }, highlighted]}>Start date:</Text>
            <Text style={{ fontSize: 0.2, textAlign: "left" }}>{dateFormatter(talks[0].startDate)}</Text>
          </View>
        </View>
    );
  }
}
