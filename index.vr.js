import React from "react";
import { AppRegistry, asset, Pano, Text, View } from "react-vr";
import text from "./text";
const textSplit = text.split(" ");

export default class VRTextReader extends React.Component {

    constructor() {
        super();

        this.timer = this.timer.bind(this);

        this.state = {
            currentCount: 0,
            leftPartOfWord: '',
            rightPartOfWord: '',
            highlightedLetter: ''
        }
    }
  componentDidMount() {
    var intervalId = setInterval(this.timer, 200);
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  timer() {
      var txt = textSplit[this.state.currentCount];
      if (txt == null)
      {
          clearInterval(this.state.intervalId);
          var intervalId = setInterval(this.timer, 200);
          this.setState({ intervalId: intervalId });
      }
    var wordChars = Array.from(txt);
    var wordCharsLength = wordChars.length;
    var wordCharsLengthFirstPart = Math.floor(wordCharsLength / 2);
    var leftPartWithoutHighlightedLetter = txt.substring(0, wordCharsLengthFirstPart - 1);
    var highlightedLetter = txt.substring(leftPartWithoutHighlightedLetter.length, leftPartWithoutHighlightedLetter.length + 1);
    var rightPart = txt.substring(leftPartWithoutHighlightedLetter.length + 1, txt.length);
    
    if (this.state.currentCount === textSplit.length) {
      clearInterval(this.state.intervalId);
    }
    else {
        this.setState({
            currentCount: this.state.currentCount + 1,
            leftPartOfWord: leftPartWithoutHighlightedLetter,
            rightPartOfWord: rightPart,
            highlightedLetter: highlightedLetter
        });
    }
  }

  render() {
      return (
          <View>
            <Pano source={asset('gray.png')} />
            <View style={{
                flex: 1,
                flexDirection: 'row',
                width: 10,
                alignItems: 'stretch',
                transform: [{ translate: [-4.4, 1, -10] }],
            }}>
                <View style={{ margin: 0, height: 1, backgroundColor: 'gray', width: 4}}>
                    <Text style={{ fontSize: 0.6, textAlign: 'right', color: 'black' }}>{this.state.leftPartOfWord}</Text>
                </View>
                <View style={{ margin: 0, height: 1, backgroundColor: 'gray' }}>
                    <Text style={{ fontSize: 0.6, textAlign: 'center', color: 'red' }}>{this.state.highlightedLetter}</Text>
                </View>
                <View style={{ margin: 0, height: 1, backgroundColor: 'gray', width: 4 }}>
                    <Text style={{ fontSize: 0.6, textAlign: 'left', color:'black' }}>{this.state.rightPartOfWord}</Text>
                </View>
            </View>     
        </View>
    );
  }
}

AppRegistry.registerComponent("VRTextReader", () => VRTextReader);