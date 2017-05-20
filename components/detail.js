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
    //$FlowFixMe
} from "react-vr";
import text from "../text";
import { splitText } from "../utils";
import { type Speaker } from "../query";
import Profile from "./profile";

type State = {
    currentCount: number,
    intervalId: number,
    textArray: Array<string>,
    start: boolean,
    leftPartOfWord: string,
    rightPartOfWord: string,
    highlightedLetter: string
};

type Props = {
    backPressed: () => void,
    description: string,
    speaker: Speaker
};

export default class VRTextReader extends React.Component {
    state: State;
    props: Props;
    timer: {};

    constructor(props: Props) {
        super(props);

        //$FlowFixMe
        this._timer = this._timer.bind(this);
        //$FlowFixMe
        this._start = this._start.bind(this);
        //$FlowFixMe
        this._pauze - this._pauze.bind(this);

        this.state = {
            intervalId: 0,
            textArray: splitText(props.description),
            start: false,
            currentCount: 0,
            leftPartOfWord: '',
            rightPartOfWord: '',
            highlightedLetter: ''
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }

    _start() {
        if (this.state.intervalId !== 0) this.setState({ start: true });
        const intervalId = setInterval(this._timer, 200);
        this.setState({ intervalId: intervalId, start: true });
    }

    _pauze() {
        if (this.state.intervalId !== 0) clearInterval(this.state.intervalId);
        this.setState({ start: false });
    }

    _reset() {
        if (this.state.intervalId !== 0)
            clearInterval(this.state.intervalId);
        this.setState({
            start: false, currentCount: 0, intervalId: 0, leftPartOfWord: '',
            rightPartOfWord: '',
            highlightedLetter: '' });
    }

    _timer() {
        var txt = this.state.textArray[this.state.currentCount];
        if (txt == null) {
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

        const { currentCount, textArray, start } = this.state;
        if (currentCount < textArray.length - 1 && start) {
            this.setState({
                currentCount: this.state.currentCount + 1,
                leftPartOfWord: leftPartWithoutHighlightedLetter,
                rightPartOfWord: rightPart,
                highlightedLetter: highlightedLetter
            });
        }
        else {
            if (this.state.intervalId) clearInterval(this.state.intervalId);
            this.setState({
                start: false, currentCount: 0,
                leftPartOfWord: '',
                rightPartOfWord: '',
                highlightedLetter: ''
            });
        }
    }

    render() {
        return (
            <View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    width: 5,
                    alignItems: "stretch",
                    transform: [{ translate: [-3.2, 2, -5] }],
                    marginBottom: 0.1
                }}>
                    <VrButton
                        style={{ width: 1.7, height: 0.3 }}
                        onClick={this.props.backPressed}>
                        <Image style={{ width: 0.25, height: 0.25 }} source={asset("back.png")}/>
                    </VrButton>
                </View>
                <Profile speaker={this.props.speaker} />
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        width: 2,
                        alignItems: "stretch",
                        transform: [{ translate: [-3.2, 2, -5] }],
                        marginBottom: 0.1
                    }}>
                    <VrButton
                        style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-around", height: 0.3, marginRight: 0.1 }}
                        onClick={this._start}
                    >
                        <Image style={{ tintColor: "white", width: 0.25, height: 0.25 }} source={asset("play.png")}/>
                    </VrButton>
                    <VrButton
                        style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-around", height: 0.3, marginRight: 0.1 }}
                        onClick={this._pauze.bind(this)}
                    >
                        <Image style={{ width: 0.25, height: 0.25 }} source={asset("stop.png")}/>
                    </VrButton>
                    <VrButton
                        style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-around", height: 0.3}}
                        onClick={this._reset.bind(this)}
                    >
                        <Image style={{ width: 0.25, height: 0.25 }} source={asset("replay.png")}/>
                    </VrButton>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    width: 19,
                    alignItems: 'stretch',

                    transform: [{ translate: [-3, 2, -5] }]
                }}>
                    <View style={{ marginLeft: 0.3, height: 1, width: 2 }}>
                        <Text style={{ fontSize: 0.6, textAlign: 'right', color: 'white' }}>{this.state.leftPartOfWord}</Text>
                    </View>
                    <View style={{ margin: 0, height: 1 }}>
                        <Text style={{ fontSize: 0.6, textAlign: 'center', color: 'red' }}>{this.state.highlightedLetter}</Text>
                    </View>
                    <View style={{ margin: 0, height: 1, width: 2 }}>
                        <Text style={{ fontSize: 0.6, textAlign: 'left', color: 'white' }}>{this.state.rightPartOfWord}</Text>
                    </View>
                </View>
            </View>
        );
    }

}

AppRegistry.registerComponent("VRTextReader", () => VRTextReader);
