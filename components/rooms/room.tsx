import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { RoomData, roominfo } from "../src/redux/actions";
import { Text } from "react-native-elements";
import Weather from "./weather";
import { connect } from "react-redux";
import { GetRoomlistOrGetRoominfo, identifyUser } from "../fetch";
import AdBanner from "../AdBanner";

interface Props {
  Room: RoomData;
  navigation: any;
  addRoom(obj: RoomData): any;
}
interface State {
  amIHost: boolean;
}
class RoomInfo extends Component<Props, State> {
  state: State = {
    amIHost: false
  };

  async componentDidMount() {
    let token = await AsyncStorage.getItem("userToken");
    let postid = this.props.navigation.state.params.Post_id;

    await GetRoomlistOrGetRoominfo(`${token}`, postid)
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.props.addRoom(res);
      });

    let userInfo = await identifyUser(token);

    if (this.props.Room.host_id === userInfo.id) {
      await this.setState({
        ...this.state,
        amIHost: true
      });
    }
  }
  editButtonPress = () => {
    //edit페이지로 이동
  };
  deleteButtonPress = () => {
    console.log("????");
    // return await post("DELETE", null, this.props.Room.id);
  };
  render() {
    return (
      <View>
        <View style={Styles.mainWrap}>
          <TouchableOpacity
            onPress={this.props.navigation.openDrawer}
            style={Styles.sideBar}
          />
          <View style={Styles.contents}>
            <View style={Styles.weatherBox}>
              <Weather />
            </View>
            <ScrollView style={Styles.textBox}>
              <Text>{this.props.Room.text}</Text>
            </ScrollView>
            {this.state.amIHost ? (
              <View style={Styles.buttonBox}>
                <TouchableOpacity
                  style={[Styles.button, { backgroundColor: "#ffffb1" }]}
                  onPress={this.editButtonPress}
                >
                  <Text> EDIT </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[Styles.button, { backgroundColor: "#ffb2b2" }]}
                  onPress={this.deleteButtonPress}
                >
                  <Text> DELETE </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
        <View style={{ bottom: 0, position: "absolute" }}>
          <AdBanner />
        </View>
      </View>
    );
  }
}
function mapStatesProps(state: any) {
  return {
    Room: state.room
  };
}
function dispatchState(dispatch: any) {
  return {
    addRoom: (room: RoomData): void => dispatch(roominfo(room))
  };
}

const Styles = StyleSheet.create({
  mainWrap: { flexDirection: "row", height: "100%" },
  sideBar: {
    width: "8%",
    height: "85%",
    backgroundColor: "#ffffff",
    elevation: 10,
    marginTop: 10,
    marginRight: 10
  },
  contents: {
    marginTop: 10,
    width: "85%",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    height: "85%",
    marginRight: 20,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  weatherBox: {
    backgroundColor: "#e5ffe5",
    borderRadius: 15,
    width: "95%",
    marginTop: 8,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8
  },
  textBox: {
    width: "95%",
    height: "100%",
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: "#e5ffe5",
    borderRadius: 15,
    padding: 10,
    marginBottom: 8
  },
  buttonBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 25,
    marginRight: 15,
    borderRadius: 5
  }
});
export default connect(mapStatesProps, dispatchState)(RoomInfo);
