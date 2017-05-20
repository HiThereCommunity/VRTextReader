// @flow

import React from "react";
//$FlowFixMe
import { AppRegistry, asset, Pano, Text, View } from "react-vr";
import Speaker from "./speaker";

import API, { type Speaker as SpeakerType } from "../query";

export default class VRTextReader extends React.Component {
  state: {
    offset: number,
    data: ?Array<SpeakerType>
  };

  async componentDidMount(): any {
    const data = await API();

    this.setState({
      data
    });
  }

  constructor() {
    super();

    this.state = {
      offset: 0,
      data: null
    };
  }

  render() {
    if (!this.state.data) {
      return null;
    }

    let contentAmount = this.state.data.length;
    let selectedSpeakerIndex = contentAmount / 2 - this.state.offset;

    const content = this.state.data.map((el, index) => {
      let profileUrl = el.avatarUrl;
      let name = el.name;
      let title = el.talks[0].title;

      let delta;
      if (index < selectedSpeakerIndex - 2) {
        delta = -1;
      } else if (index > selectedSpeakerIndex + 2) {
        delta = 1;
      }

      return {
        profileUrl,
        title,
        name,
        onLook: () => {
          if (delta) {
            this.setState({
              offset: this.state.offset - delta
            });
          }
        },
        onClick: () => {
          this.props.onSpeakerSelection(el)
        }
      };
    });

    let speakers = content.map((el, index) => <Speaker {...el} key={index} />);

    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            layoutOrigin: [0.5, 0.5, 0],
            transform: [{ translate: [this.state.offset, 0, -3] }]
          }}
        >
          {speakers}
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent("VRTextReader", () => VRTextReader);
