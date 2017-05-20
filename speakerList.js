// @flow

import React from "react";
import { AppRegistry, asset, Pano, Text, View } from "react-vr";
import Speaker from "./speaker";

import API, { type APIResult } from "./query";

export default class VRTextReader extends React.Component {

  state: {
    offset: number,
    data: ?APIResult
  }

  async componentDidMount(): any {
    const data = await API();

    this.setState({
      data
    })
  }

  constructor() {
    super();

    this.state = {
      offset: 0,
      data: null
    }
  }

  render() {

    let contentAmount = thursdaySections.length;

    let selectedSpeakerIndex = (contentAmount/2) - this.state.offset;

    if (!this.state.data) {
      return null;
    }

    const content = this.state.data.map((el, index) => {
      let profileUrl = el.avatarUrl;
      let text = el.talks[0].title;

      let delta;
      if (index < selectedSpeakerIndex) {
        delta = -1;
      }
      else if (index > selectedSpeakerIndex) {
        delta = 1;
      }
      else {
        delta = 0;
      }

      return {
        profileUrl,
        text,
        onLook: () => {
          this.setState({
            offset: this.state.offset - delta
          })
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
            transform: [{ translate: [this.state.offset, 0, -4] }]
          }}
        >
          {speakers}
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent("VRTextReader", () => VRTextReader);
