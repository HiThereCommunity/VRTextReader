// @flow

import React, { Component } from "react";
//$FlowFixMe
import { Image, Text, View, VrButton } from "react-vr";

type Props = {
  profileUrl?: string,
  name: string,
  title: string,
  onLook: () => void,
  onClick: () => void
};

const defaultURL = "https://facebook.github.io/react/img/logo_og.png";

export default class Speaker extends Component {
  state: {
    selected: boolean
  };

  props: Props;

  constructor() {
    super();
    this.state = {
      selected: false
    };
  }

  render() {
    const { props } = this;
    const { selected } = this.state;
    console.log("render");
    const url = props.profileUrl ? props.profileUrl : defaultURL;
    return (
      <View
        onEnter={() => {
          props.onLook();
          this.setState({
            selected: true
          });
        }}
        onExit={() => {
          this.setState({
            selected: false
          });
        }}
      >
        <VrButton onClick={props.onClick}>
          <View>
            <Image
              source={{ uri: url }}
              style={{
                width: 1,
                height: 1,
                backgroundColor: "black",
                opacity: selected ? 1 : 0.5
              }}
            />
            <View
              style={{
                position: "absolute",
                top: 0,
                width: 1,
                height: 1,
                left: 0,
                flex: 1,
                flexDirection: "column"
              }}
            >
              <Text
                style={{
                  margin: "5",
                  textAlign: "center",
                  fontWeight: "600",
                  alignSelf:'center'
                }}
              >
                {props.name}
              </Text>
              <Text
                style={{
                  margin: "5",
                  textAlign: "center",
                  fontWeight: "600",
                  alignSelf:'center'
                }}
              >
                {props.title}
              </Text>
            </View>
          </View>
        </VrButton>
      </View>
    );
  }
}
