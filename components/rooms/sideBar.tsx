import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { RoomData, joinChat } from "../src/redux/actions";
import { Text, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { posts } from "../fetch";
interface Props {
  navigation: any;
  Room: RoomData;
  join: boolean;
  JoinChat(): any;
}
class SideBar extends Component<Props> {
  componentDidMount() {
    posts("GET", null, null, "my_list");
  }
  joinChat = () => {
    this.props.JoinChat();
  };
  getOut = () => {
    this.props.JoinChat();
  };
  render() {
    return (
      <View style={styles.center}>
        <View style={{ height: "90%", width: "100%", marginBottom: 10 }}>
          <View style={styles.head}>
            <Icon
              iconStyle={styles.headerDetails}
              type="feather"
              name="user"
              size={68.4}
              color="black"
            />
            <View
              style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {this.props.Room.host_name}
              </Text>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>참여자 목록</Text>
          </View>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ width: "100%", height: 300 }}
          >
            {this.props.Room.participants.map((data, index) => (
              <View key={index} style={{ alignItems: "center" }}>
                <Text key={index} style={styles.contents}>
                  {data}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={{ height: "10%" }}>
          {this.props.join ? (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Chat")}
            >
              <Text>채팅방 GO!</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
        <View style={styles.bottom}>
          {this.props.join ? (
            <View
              style={{
                alignItems: "flex-end",
                marginRight: 10
              }}
            >
              <TouchableOpacity onPress={this.getOut} style={styles.bottomText}>
                <Text style={{ fontSize: 15 }}>나가기</Text>
                <Icon type="feather" name="log-out" size={22} />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                alignItems: "flex-end",
                marginRight: 10
              }}
            >
              <TouchableOpacity
                onPress={this.joinChat}
                style={styles.bottomText}
              >
                <Text style={{ fontSize: 15 }}>참여하기</Text>
                <Icon type="feather" name="log-in" size={22} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerDetails: {
    backgroundColor: "white",
    width: 70,
    height: 70,
    borderRadius: 35,
    marginTop: 20,
    justifyContent: "center"
  },
  head: {
    width: "100%",
    height: 130,
    backgroundColor: "#88D8B0",
    justifyContent: "center",
    alignContent: "center"
  },
  bottom: {
    width: "100%",
    height: "5%",
    bottom: 0,
    position: "absolute",
    justifyContent: "flex-end",
    backgroundColor: "#88D8B0"
  },
  title: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 30
  },
  contents: {
    fontSize: 15
  },
  bottomText: {
    marginBottom: 4,
    borderRadius: 8,
    marginLeft: 3,
    backgroundColor: "white",
    flexDirection: "row",
    alignContent: "flex-end"
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
