import React from "react";
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import io from "socket.io-client";
import AdBanner from "../components/AdBanner";
import { Icon } from "react-native-elements";

// const socket = io.connect("http://localhost:3000/chatroom");

interface User {
  _id: number | string;
  name: string;
  avatar: string;
}

interface Message {
  _id: number | string;
  text: string;
  createdAt: any;
  user: User;
}

interface NewChatScreenProps {}
interface NewChatScreenStates {
  messages: Array<any>;
  post_id: number | string;
  chatLoaded: boolean;
  user_id: number;
}

export default class NewChatScreen extends React.Component<
  NewChatScreenProps,
  NewChatScreenStates
> {
  public messages: any;
  constructor(props: NewChatScreenProps) {
    super(props);
  }

  state: NewChatScreenStates = {
    messages: [],
    post_id: 0,
    user_id: 0,
    chatLoaded: false
  };

  //   {
  //     _id: 1,
  //     text: "Hello developer",
  //     createdAt: new Date(),
  //     user: {
  //       _id: 2,
  //       name: "React Native",
  //       avatar: "https://placeimg.com/140/140/any"
  //     },
  //   }

  componentDidMount() {
    const socket = io.connect("http://localhost:3000/chatroom");
    const post_id = this.state.post_id + "";

    if (!this.state.chatLoaded) {
      this._loadOldMessage();
      this.state.chatLoaded = true;
    }

    socket.emit("joinRoom", post_id);
    socket.on("message", (msgs: any) => {
      // msgs는 어레이에 들어있는 데이터들.
      // console.log("state messages: ", this.state.messages);
      // console.log("incoming msgs: ", msgs);
      this.setState({
        ...this.state,
        messages: [msgs].concat(this.state.messages)
      });
    });
  }

  _onSend(messages: Array<any> = []) {
    const post_id = this.state.post_id + "";

    const newmessages = messages;
    newmessages[0].post_id = post_id;
    // console.log("newmessages: ", newmessages);

    // this.setState((previousState: any) => ({
    //   messages: GiftedChat.append(previousState.messages, newmessages)
    // }));
    const socket = io.connect("http://localhost:3000/chatroom");
    socket.emit("message", newmessages[0]);
  }

  _loadOldMessage() {
    const post_id = this.state.post_id;
    fetch("http://localhost:3000/chats?post_id=" + post_id)
      .then(res => res.json())
      .then(datas => {
        this.setState({
          ...this.state,
          messages: datas.reverse()
        });
        // console.log(datas);
      });
  }

  _renderMessager(message: Message) {
    console.log("message: ", message);
    return this.state.user_id !== message.user._id ? (
      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
          display: "flex",
          flexDirection: "row",
          marginBottom: 15,
          marginLeft: 15,
          alignSelf: "flex-start",
          backgroundColor: "#eeeeee",
          padding: 12,
          borderRadius: 15
        }}
      >
        <Image
          source={{
            uri: message.user.avatar
          }}
          style={{ width: 35, height: 35, borderRadius: 20, marginRight: 10 }}
        />
        <View>
          <Text style={{ fontSize: 15, fontWeight: "600", marginBottom: 3 }}>
            {message.user.name}
          </Text>
          <Text style={{}}>{message.text}</Text>
        </View>
      </View>
    ) : (
      <View>
        <View
          style={{
            alignItems: "flex-end",
            justifyContent: "flex-start",
            display: "flex",
            flexDirection: "row",
            marginBottom: 15,
            marginRight: 15,
            alignSelf: "flex-end",
            backgroundColor: "#0BB5FF",
            padding: 12,
            borderRadius: 15
          }}
        >
          <Image
            source={{
              uri: message.user.avatar
            }}
            style={{ width: 35, height: 35, borderRadius: 20, marginRight: 10 }}
          />
          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                marginBottom: 3
              }}
            >
              {message.user.name}
            </Text>
            <Text style={{}}>{message.text}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    // console.log(this.state.messages);
    return (
      <View style={{ flex: 1 }}>
        <AdBanner />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this._onSend(messages)}
          user={{
            _id: 0,
            name: "Hyun",
            avatar:
              "https://t1.daumcdn.net/news/201908/07/tvreport/20190807162900279rijn.jpg"
          }}
          renderUsernameOnMessage={true}
          renderMessage={(item: any) => {
            // console.log("item: ", item);
            return this._renderMessager(item.currentMessage);
          }}
        />
        {Platform.OS === "android" && (
          <KeyboardAvoidingView behavior="padding" />
        )}
      </View>
    );
  }
}
