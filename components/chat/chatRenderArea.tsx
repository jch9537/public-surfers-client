import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  ScrollView,
  Image
} from "react-native";
import io from "socket.io-client";

let dummydatas: Array<MessageInterface> = [
  {
    id: 1,
    user_id: 1,
    user_name: "hyun",
    text: "hihi",
    timestamp: "2019-11-20-11:06",
    img_url:
      "https://t1.daumcdn.net/news/201908/07/tvreport/20190807162900279rijn.jpg"
  },
  {
    id: 2,
    user_id: 1,
    user_name: "hyun",
    text: "what are you doing?",
    timestamp: "2019-11-20-11:06",
    img_url:
      "https://t1.daumcdn.net/news/201908/07/tvreport/20190807162900279rijn.jpg"
  },
  {
    id: 3,
    user_id: 2,
    user_name: "natie",
    text: "nothing",
    timestamp: "2019-11-20-12:06"
  },
  {
    id: 4,
    user_id: 2,
    user_name: "natie",
    text: "why?",
    timestamp: "2019-11-20-12:06"
  },
  {
    id: 5,
    user_id: 1,
    user_name: "hyun",
    text: "just because i'm bored",
    timestamp: "2019-11-20-12:08",
    img_url:
      "https://t1.daumcdn.net/news/201908/07/tvreport/20190807162900279rijn.jpg"
  },
  {
    id: 6,
    user_id: 1,
    user_name: "hyun",
    text: "test\n test\n test\n",
    timestamp: "2019-11-20-12:08",
    img_url:
      "https://t1.daumcdn.net/news/201908/07/tvreport/20190807162900279rijn.jpg"
  },
  {
    id: 7,
    user_id: 1,
    user_name: "hyun",
    text: "test\n test\n test\n",
    timestamp: "2019-11-20-12:08",
    img_url:
      "https://t1.daumcdn.net/news/201908/07/tvreport/20190807162900279rijn.jpg"
  },
  {
    id: 8,
    user_id: 1,
    user_name: "hyun",
    text: "test\n test\n test\n",
    timestamp: "2019-11-20-12:08",
    img_url:
      "https://t1.daumcdn.net/news/201908/07/tvreport/20190807162900279rijn.jpg"
  },
  {
    id: 9,
    user_id: 1,
    user_name: "hyun",
    text: "test\n test\n test\n",
    timestamp: "2019-11-20-12:08",
    img_url:
      "https://t1.daumcdn.net/news/201908/07/tvreport/20190807162900279rijn.jpg"
  },
  {
    id: 10,
    user_id: 1,
    user_name: "hyun",
    text: "test\n test\n test\n",
    timestamp: "2019-11-20-12:08",
    img_url:
      "https://t1.daumcdn.net/news/201908/07/tvreport/20190807162900279rijn.jpg"
  }
];

interface MessageInterface {
  id: number;
  user_id: number;
  user_name: string;
  text: string;
  timestamp: string;
  profile_img?: Blob;
  img_url?: string;
}

interface ChatRenderProps {}

interface ChatRenderState {
  messages: Array<MessageInterface>;
}

export default class ChatRenderArea extends React.Component<
  ChatRenderProps,
  ChatRenderState
> {
  public socket: any;
  public scrollTo: any;

  constructor(props: ChatRenderProps) {
    super(props);
    this.Message = this.Message.bind(this);
    this._scrollToBottom = this._scrollToBottom.bind(this);
  }

  state: ChatRenderState = {
    messages: dummydatas
  };

  componentDidMount() {
    //socket.io를 이용하여 서버에 접속.
    this.socket = io.connect("server");
    this.socket.on("eventname", (msgs: any) => {
      // msgs는 어레이에 들어있는 데이터들.
      this.setState({
        ...this.state,
        messages: this.state.messages.concat(msgs)
      });
    });
  }

  _scrollToBottom() {}

  Message({ item }: any) {
    return (
      <View style={Styles.message}>
        {item.img_url ? (
          <Image
            source={{
              uri: item.img_url
            }}
            style={Styles.profileImage}
          />
        ) : (
          <Image
            source={{
              uri:
                "https://i2.wp.com/www.refreshmarketing.co.uk/wp-content/uploads/2014/10/linked-in-profile-anonymous.jpg"
            }}
            style={Styles.profileImage}
          />
        )}
        <View>
          <Text style={Styles.name}>{item.user_name}</Text>
          <Text style={Styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={Styles.renderPage} nestedScrollEnabled={true}>
        <FlatList
          data={this.state.messages}
          keyExtractor={item => {
            return "" + item.id;
          }}
          renderItem={this.Message}
          style={Styles.messageArea}
        />
      </ScrollView>
    );
  }
}

const Styles = StyleSheet.create({
  renderPage: {
    width: "100%"
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  messageArea: {
    marginLeft: "3%",
    marginRight: "3%",
    marginTop: "15%",
    marginBottom: "15%"
  },
  message: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginBottom: 3,
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eeeeee",
    alignSelf: "auto"
  },
  name: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 5
  },
  text: {
    fontSize: 15
  }
});
