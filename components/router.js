
//@flow


import React from "react";

//$FlowFixMe
import { AppRegistry, asset, Pano, Text, View, VrButton, Image } from "react-vr";

import Home from "./menu";
import Detail from "./detail"


type Route = "HOME" | "DETAIL";

type State = {
  route: Route
};

export default class Router extends React.Component {
  state: State;
  timer: {};

  constructor() {
    super();
    this.state = {
      route: "HOME"
    };
  }

  render() {
    let content;
    switch(this.state.route) {
      case "HOME":
          content = <Home setRoute={(route: Route) => {
            this.setState({route});
          }}/>
          break;
      case "DETAIL":
          content = <Detail description="This is a monkey in a box. Hello There!" backPressed={() => {
            this.setState({route: "HOME"});
          }}/>
          break;
      default:
          throw new Error("No Route");
      }

    return content;
  }
}
