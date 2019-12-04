import React from "react";
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage,
  StyleSheet
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import io from "socket.io-client";
import AdBanner from "./AdBanner";
import { connect } from "react-redux";
import { getPostId, RoomData } from "./src/redux/actions";

// const socket = io.connect("http://15.164.218.247:3000/chatroom");

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

interface NewChatScreenProps {
  getRoomState(): any;
  Room: RoomData;
}
interface NewChatScreenStates {
  messages: Array<any>;
  post_id: number | string;
  chatLoaded: boolean;
  user_id: number;
  user_name: string;
  user_image: string;
}

export class ChatScreen extends React.Component<
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
    user_name: "Tester",
    user_image:
      "https://post-phinf.pstatic.net/MjAxNzA4MjVfMTA1/MDAxNTAzNjQ1OTIzNDQ4.R3tizgK7EWN-eDfSaMO8huwh-vYCW1E4wfv4zlkoPfAg.5ZKwL8T_kX3KPpyvreKUuXQjPchQ2bUJhn_VSuN7DAEg.PNG/%EC%9D%B4%EB%AF%B8%EC%A7%80_7.png?type=w1200",
    chatLoaded: false
  };

  async componentDidMount() {
    //방정보 불러오기
    await this.props.getRoomState();
    await this.setState({
      ...this.state,
      post_id: this.props.Room.id
    });
    //소켓 연결
    const socket = io.connect("http://15.164.218.247:3000/chatroom");
    const post_id = this.state.post_id;

    //채팅방 참가
    socket.emit("joinRoom", "" + post_id);

    //업데이트되는 채팅 불러오기
    socket.on("message", (msgs: any) => {
      this.setState({
        ...this.state,
        messages: [msgs].concat(this.state.messages)
      });
    });

    //내 정보 불러오기.
    const myInfo = await this._getMyInfo();
    await this.setState({
      ...this.state,
      user_id: myInfo.id,
      user_name: myInfo.name,
      user_image: myInfo.img_url
    });

    let oldMessages;
    //옛날 채팅 로딩
    if (!this.state.chatLoaded) {
      oldMessages = await this._loadOldMessage();
      this.state.chatLoaded = true;
    }

    let sortedMessages = await this._sortChats(oldMessages);

    await this.setState({
      ...this.state,
      messages: sortedMessages
    });
  }

  async _onSend(messages: Array<any> = []) {
    const post_id = this.state.post_id;

    const newmessages = messages;
    newmessages[0].post_id = post_id;
    let push_token: any = await AsyncStorage.getItem("pushToken");
    // console.log("push_token: ", push_token);
    // authorization:push_token

    // console.log("newmessages: ", newmessages);

    // this.setState((previousState: any) => ({
    //   messages: GiftedChat.append(previousState.messages, newmessages)
    // }));
    const socket = io.connect("http://15.164.218.247:3000/chatroom");
    socket.emit("message", newmessages[0]);

    await fetch("http://15.164.218.247:3000/chat/push_noti", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        push_token: push_token
      },
      body: JSON.stringify({ post_id: post_id })
    });
  }

  async _loadOldMessage() {
    const post_id = this.state.post_id;
    let dataChunk = await fetch(
      "http://15.164.218.247:3000/chat?post_id=" + post_id
    );
    let parsedData = dataChunk.json();

    await console.log("messages: ", parsedData);

    return parsedData;
  }

  async _sortChats(chatArray: Array<any>) {
    return chatArray.sort((a, b) => {
      if (a._id > b._id) {
        return -1;
      }
      if (a._id < b._id) {
        return 1;
      }
      return 0;
    });
  }

  _renderMessager(message: Message) {
    // console.log("message: ", message);
    return this.state.user_id !== message.user._id ? (
      <View style={Styles.incomingWrap}>
        <Image
          source={{
            uri: message.user.avatar
          }}
          style={Styles.incomingImg}
        />
        <View style={Styles.incomingText}>
          <Text style={{ fontSize: 15, fontWeight: "600", marginBottom: 3 }}>
            {message.user.name}
          </Text>
          <Text style={{}}>{message.text}</Text>
        </View>
      </View>
    ) : (
        <View style={Styles.outGoingWarp}>
          <View style={Styles.outGoingText}>
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
          <Image
            source={{
              uri: message.user.avatar
            }}
            style={Styles.outGoingImg}
          />
        </View>
      );
  }

  async _getMyInfo() {
    let user_token: any = await AsyncStorage.getItem("userToken");

    let myInfo = await fetch("http://15.164.218.247:3000/identify", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: user_token
      }
    }).then(res => res.json());

    return myInfo;
  }

  render() {
    return Platform.OS === "android" ? (
      <View style={{ flex: 1 }}>
        <AdBanner />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this._onSend(messages)}
          user={{
            _id: this.state.user_id,
            name: this.state.user_name,
            avatar: this.state.user_image
          }}
          renderUsernameOnMessage={true}
          renderMessage={(item: any) => {
            // console.log("item: ", item);
            return this._renderMessager(item.currentMessage);
          }}
        />
        {Platform.OS === "android" && (
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={100}
            enabled
          />
        )}
      </View>
    ) : null;
  }
}

function mapStatesProps(state: any) {
  return {
    Room: state.room
  };
}
function getRoomState(dispatch: any) {
  return {
    getRoomState: (): void => dispatch(getPostId())
  };
}

const Styles = StyleSheet.create({
  incomingWrap: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    display: "flex",
    marginBottom: 15,
    marginLeft: 15,
    alignSelf: "flex-start",
    flexDirection: "row"
  },
  incomingImg: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10
  },
  incomingText: {
    backgroundColor: "#eeeeee",
    padding: 8,
    borderRadius: 15,
    alignSelf: "flex-start"
  },
  outGoingWarp: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    display: "flex",
    marginBottom: 15,
    marginRight: 15,
    alignSelf: "flex-end",
    flexDirection: "row"
  },
  outGoingText: {
    backgroundColor: "#82CAFA",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignSelf: "flex-end"
  },
  outGoingImg: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginLeft: 10
  }
});

export default connect(mapStatesProps, getRoomState)(ChatScreen);
