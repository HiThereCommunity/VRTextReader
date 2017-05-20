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

type State = {
  route: "HOME" | "DETAIL"
};

type Props = {
  setRoute: (route: "HOME" | "DETAIL") => void
};

export default class ViewColoredBoxesWithText extends Component {
  state: State;
  props: Props;

  render() {
    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            width: 2,
            alignItems: "stretch",
            transform: [{ translate: [-1, 1, -5] }]
          }}
        >
          <VrButton
            style={{ margin: 0.1, height: 0.3, backgroundColor: "red" }}
            onClick={() => {
              this.props.setRoute("DETAIL");
            }}
          >
            <Text style={{ fontSize: 0.2, textAlign: "center" }}>Red</Text>
          </VrButton>

          <VrButton
            style={{ margin: 0.1, height: 0.3, backgroundColor: "orange" }}
            onClick={() => {
              this.props.setRoute("DETAIL");
            }}
          >
            <Text style={{ fontSize: 0.2, textAlign: "center" }}>Orange</Text>
          </VrButton>

          <View style={{ margin: 0.1, height: 0.3, backgroundColor: "yellow" }}>
            <Text style={{ fontSize: 0.2, textAlign: "center" }}>Yellow</Text>
          </View>
          <View style={{ margin: 0.1, height: 0.3, backgroundColor: "green" }}>
            <Text style={{ fontSize: 0.2, textAlign: "center" }}>Green</Text>
          </View>
          <View style={{ margin: 0.1, height: 0.3, backgroundColor: "blue" }}>
            <Text style={{ fontSize: 0.2, textAlign: "center" }}>Blue</Text>
          </View>
          <View style={{ margin: 0.1, height: 0.3, backgroundColor: "blue" }}>
            <Text style={{ fontSize: 0.2, textAlign: "center" }}>Blue</Text>
          </View>
          <View style={{ margin: 0.1, height: 0.3, backgroundColor: "blue" }}>
            <Text style={{ fontSize: 0.2, textAlign: "center" }}>Blue</Text>
          </View>

          <View style={{ margin: 0.1, height: 0.3, backgroundColor: "blue" }}>
            <Text style={{ fontSize: 0.2, textAlign: "center" }}>Blue</Text>
          </View>

        </View>
      </View>
    );
  }
}
