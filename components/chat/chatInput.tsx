import React from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { Icon } from "react-native-elements";
import io from "socket.io-client";

interface ChatInputProps {
  post_id: number;
}
interface ChatInputState {
  inputText: string;
  post_id: number;
}

export default class ChatInput extends React.Component<
  ChatInputProps,
  ChatInputState
> {
  public socket: any;

  constructor(props: ChatInputProps) {
    super(props);
    this._writeText = this._writeText.bind(this);
    this._sendMessage = this._sendMessage.bind(this);
  }

  state: ChatInputState = {
    inputText: "",
    post_id: 0
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      post_id: this.props.post_id
    });
    this.socket = io.connect("server");
  }

  _writeText(input: string) {
    this.setState({
      ...this.state,
      inputText: input
    });
  }

  _sendMessage(input: string) {
    if (input.length === 0) {
      return;
    } else {
      //chats로 Post fetch
      Alert.alert("DEV", `${input}`);

      this.socket.emit("eventname", {
        //아직 확정된 것은 없음.
        user_id: 1,
        post_id: this.state.post_id,
        text: this.state.inputText
      });
    }
  }

  render() {
    return (
      <View style={styles.inputBox}>
        <View style={styles.textInput1}>
          <TextInput
            placeholder="  Write here!"
            style={styles.textInput2}
            onChangeText={input => this._writeText(input)}
          />
        </View>
        <Icon
          type="font-awesome"
          size={20}
          name="paper-plane"
          style={styles.icon}
          onPress={(): void => this._sendMessage(this.state.inputText)} // 추후에 chat DB에 state.inputText를 post요청을 보내는 fetch, 다만 inputText가 비었다면, 요청이 안가도록.
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#ffffff",
    width: "100%",
    height: 50
  },
  textInput1: {
    marginRight: 8,
    backgroundColor: "#eeeeee",
    width: "85%",
    borderRadius: 10,
    height: 35
  },
  textInput2: {
    backgroundColor: "#eeeeee",
    width: "82%",
    height: 35,
    marginLeft: 7
  },
  icon: {
    opacity: 0.3,
    marginRight: 5,
    width: 20,
    height: 20
  }
});
