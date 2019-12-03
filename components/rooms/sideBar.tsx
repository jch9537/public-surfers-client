import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  AsyncStorage,
  Image
} from "react-native";
import { RoomData, joinChat } from "../src/redux/actions";
import { Text, Icon } from "react-native-elements";
import { connect } from "react-redux";
import {
  JoinChatfromSideBar,
  GetMyRooms,
  identifyUser,
  participateRoom
} from "../fetch";

interface Props {
  navigation: any;
  Room: RoomData;
  join: boolean;
  JoinChat(): void;
}

interface State {
  amIParticipant: boolean;
}

class SideBar extends Component<Props, State> {
  state: State = {
    amIParticipant: false
  };

  async componentDidMount() {
    let token = await AsyncStorage.getItem("userToken");

    //참여여부 확인
    let userData = await identifyUser(token);
    let participants = this.props.Room.participants;

    if (participants.includes(userData.name)) {
      this.setState({
        ...this.state,
        amIParticipant: true
      });
    }
  }

  //채팅창 입장
  joinChat = async () => {
    return this.props.navigation.navigate("Chat");
  };

  //방에 참여
  joinRoom = async () => {
    let token = await AsyncStorage.getItem("userToken");
    await participateRoom(token, this.props.Room.id);

    await this.setState({
      ...this.state,
      amIParticipant: true
    });
  };

  //방에서 나가기
  getOut = async () => {
    let token = await AsyncStorage.getItem("userToken");
    await JoinChatfromSideBar(`${token}`, this.props.Room.id)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          Alert.alert("나가기 실패");
        }
      })
      .then(res => {
        if (res) {
          this.props.JoinChat();
        }
      });
    await this.setState({
      ...this.state,
      amIParticipant: false
    });
  };

  render() {
    console.log("sidebarState: ", this.state);
    return (
      <View style={Styles.wrap}>
        <View style={Styles.head}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={{
                uri:
                  "https://www.clipartwiki.com/clipimg/detail/31-312536_surf-icon-illustration.png"
              }}
              style={Styles.host_image}
            />
            <Text style={Styles.host_name}>{this.props.Room.host_name}</Text>
          </View>
        </View>

        <Text style={Styles.title}>참여자 목록</Text>
        <ScrollView>
          {this.props.Room.participants.map((data, index) => (
            <Text key={index} style={Styles.contents}>
              {data}
            </Text>
          ))}
        </ScrollView>

        {/* 하단버튼 */}
        {this.state.amIParticipant ? (
          <View style={Styles.buttonWrap}>
            <TouchableOpacity style={Styles.button} onPress={this.joinChat}>
              <Text style={Styles.activated}>채팅방 들어가기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.button} onPress={this.getOut}>
              <Text style={Styles.activated}>모임에서 나가기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.button}>
              <Text style={Styles.unactivated}>모임에 참여하기</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={Styles.buttonWrap}>
            <TouchableOpacity style={Styles.button}>
              <Text style={Styles.unactivated}>채팅방 들어가기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.button}>
              <Text style={Styles.unactivated}>모임에서 나가기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.button} onPress={this.joinRoom}>
              <Text style={Styles.activated}>모임에 참여하기</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  head: {
    height: 100,
    backgroundColor: "#d3d3d3",
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 60,
    paddingBottom: 50,
    flexDirection: "column",
    width: "100%"
  },
  host_name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 7
  },
  host_image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  title: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 20
  },
  contents: {
    fontSize: 15,
    marginBottom: 5
  },
  activated: {},
  unactivated: { opacity: 0.2 },
  buttonWrap: { width: "100%" },
  button: {
    padding: 10,
    borderTopWidth: 0.5,
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});

function mapStatesProps(state: any) {
  return {
    Room: state.room,
    join: state.Join
  };
}

function dispatchState(dispatch: any) {
  return {
    JoinChat: (): void => dispatch(joinChat())
  };
}

export default connect(mapStatesProps, dispatchState)(SideBar);
