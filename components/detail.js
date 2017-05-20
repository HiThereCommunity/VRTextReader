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



type State = {
    currentCount: number,
    intervalId: number,
    textArray: Array<string>,
    start: boolean
};

type Props = {
    backPressed: () => void,
    description: string
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
        const intervalId = setInterval(this._timer, 200);
        this.setState({ intervalId: intervalId, start: true });
    }

    _pauze() {
        if (this.state.intervalId !== 0) clearInterval(this.state.intervalId);
        this.setState({ start: false, intervalId: 0 });
    }

    _reset() {
        if (this.state.intervalId !== 0) clearInterval(this.state.intervalId);
        this.setState({ start: false, currentCount: 0, intervalId: 0 });
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
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        width: 5,
                        alignItems: "stretch",
                        transform: [{ translate: [-4, 1, -5] }],
                        marginBottom: 0.1
                    }}>
                    <VrButton
                        style={{ flex: 1, height: 0.3, backgroundColor: "green", marginRight: 0.1 }}
                        onClick={this._start}
                    >
                        <Text style={{ fontSize: 0.2, textAlign: "center" }}>Start</Text>
                    </VrButton>
                    <VrButton
                        style={{ flex: 1, height: 0.3, backgroundColor: "grey", marginRight: 0.1 }}
                        onClick={this._pauze}
                    >
                        <Text style={{ fontSize: 0.2, textAlign: "center" }}>Stop</Text>
                    </VrButton>
                    <VrButton
                        style={{ flex: 1, height: 0.3, backgroundColor: "red" }}
                        onClick={this._reset}
                    >
                        <Text style={{ fontSize: 0.2, textAlign: "center" }}>Reset</Text>
                    </VrButton>
                </View>
                <View style={{ marginBottom: 0.1, height: 1.6, width: 5, backgroundColor: "white" }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        width: 8,
                        alignItems: 'stretch',
                        transform: [{ translate: [-4, 1, -5] }]
                    }}>
                        <View style={{ margin: 0, height: 1, backgroundColor: 'white', width: 3 }}>
                            <Text style={{ fontSize: 0.6, textAlign: 'right', color: 'black' }}>{this.state.leftPartOfWord}</Text>
                        </View>
                        <View style={{ margin: 0, height: 1, backgroundColor: 'white' }}>
                            <Text style={{ fontSize: 0.6, textAlign: 'center', color: 'red' }}>{this.state.highlightedLetter}</Text>
                        </View>
                        <View style={{ margin: 0, height: 1, backgroundColor: 'white', width:4 }}>
                            <Text style={{ fontSize: 0.6, textAlign: 'left', color: 'black' }}>{this.state.rightPartOfWord}</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    width: 5,
                    alignItems: "stretch",
                    transform: [{ translate: [-4, 1, -5] }],
                    marginBottom: 0.1
                }}>
                    <VrButton
                        style={{ width: 1.7, height: 0.3, backgroundColor: "grey" }}
                        onClick={this.props.backPressed}>
                        <Text style={{ fontSize: 0.2, textAlign: "center" }}>Back</Text>
                    </VrButton>
                </View>
            </View>
        );
    }
}

AppRegistry.registerComponent("VRTextReader", () => VRTextReader);