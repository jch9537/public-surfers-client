import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import ChatInput from "../components/chatInput";
import ChatRenderArea from "../components/chatRenderArea";

const server = "";

export interface ChatScreenProps {}
export interface ChatScreenState {
  post_id: number;
}

export default class ChatScreen extends React.Component<
  ChatScreenProps,
  ChatScreenState
> {
  constructor(props: ChatScreenProps) {
    super(props);
  }

  state: ChatScreenState = {
    post_id: 0
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ChatRenderArea />
        <ChatInput post_id={this.state.post_id} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
