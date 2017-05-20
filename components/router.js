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
  // $FlowFixMe
} from "react-vr";

import Home from "./menu";
import Detail from "./detail";
import SpeakerList from "./speakerList";
import { type Speaker } from "../query";

type Route = "HOME" | "DETAIL";

type State = {
  state:
    | {
        route: "HOME"
      }
    | {
        route: "DETAIL",
        speaker: Speaker
      }
};

export default class Router extends React.Component {
  state: State;
  timer: {};

  constructor() {
    super();
    this.state = {
      state: {
        route: "HOME"
      }
    };
  }

  render() {
    let content;
    const { state } = this.state;

    switch (state.route) {
      case "HOME":
        content = (
          <SpeakerList
            onSpeakerSelection={speaker => {
              this.setState({
                state: {
                  route: "DETAIL",
                  speaker
                }
              });
            }}
          />
        );
        break;
      case "DETAIL":
        content = (
          <Detail
            description={state.speaker.talks[0].description}
            backPressed={() => {
              this.setState({
                state: {
                  route: "HOME"
                }
              });
            }}
          />
        );
        break;
      default:
        throw new Error("No Route");
    }

    return content;
  }
}
