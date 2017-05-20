import React from "react";
import { AppRegistry, asset, Pano, Text, View } from "react-vr";
import text from "./text";
import TextSplitter from './TextSplitter';
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
      //if (this.state.currentCount > 10) {
      //    clearInterval(this.state.intervalId);
      //}
    var txt = textSplit[this.state.currentCount];
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
        <View style={{
            flex: 1,
            flexDirection: 'column',
            width: 2,
            alignItems: 'stretch',
            transform: [{ translate: [-1, 1, -5] }],
        }}>
            <View style={{ margin: 0.1, height: 0.3, backgroundColor: 'red' }}>
                <Text style={{ fontSize: 0.2, textAlign: 'center' }}>{this.state.leftPartOfWord}</Text>
            </View>
            <View style={{ margin: 0.1, height: 0.3, backgroundColor: 'orange' }}>
                <Text style={{ fontSize: 0.2, textAlign: 'center' }}>{this.state.highlightedLetter}</Text>
            </View>
            <View style={{ margin: 0.1, height: 0.3, backgroundColor: 'red' }}>
                <Text style={{ fontSize: 0.2, textAlign: 'center' }}>{this.state.rightPartOfWord}</Text>
            </View>
        </View>
        <View style={{
            flex: 1,
            flexDirection: 'column',
            width: 2,
            alignItems: 'stretch',
            transform: [{ translate: [-1, 1, -5] }],
        }}>
            <View style={{ margin: 0.1, height: 0.3, backgroundColor: 'red' }}>
                <Text style={{ fontSize: 0.2, textAlign: 'center' }}>{this.state.leftPartOfWord}</Text>
            </View>
        </View>
        <View style={{
            flex: 1,
            flexDirection: 'column',
            width: 2,
            alignItems: 'stretch',
            transform: [{ translate: [-1, 1, -5] }],
        }}>
            <View style={{ margin: 0.1, height: 0.3, backgroundColor: 'red' }}>
                <Text style={{ fontSize: 0.2, textAlign: 'center' }}>{this.state.leftPartOfWord}</Text>
            </View>
        </View>
        </View>
    );
  }
}

AppRegistry.registerComponent("VRTextReader", () => VRTextReader);
