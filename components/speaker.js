// @flow

import React from "react";
//$FlowFixMe
import { Image, Text, View, VrButton } from "react-vr";

type Props = {
  profileUrl?: string,
  text: string,
  onLook: () => void,
  onClick: () => void
};

const defaultURL = "https://facebook.github.io/react/img/logo_og.png";

export default (props: Props) => {
  const url = props.profileUrl ? props.profileUrl : defaultURL;
  return (
    <View onEnter={props.onLook}>
      <VrButton
        onClick={props.onClick}
      >
        <Image source={{ uri: url }} style={{ width: 1, height: 1 }}>
          <Text
            style={{
              margin: "5",
              textAlign: "center",
              fontWeight: "600"
            }}
          >
            {props.text}
          </Text>
        </Image>
      </VrButton>
    </View>
  );
};
