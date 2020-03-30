import React, { Component } from "react";
import { View, ScrollView, Text, Alert, AsyncStorage } from "react-native";
import ListView from "../Board/BoardList";
import { GetMyRooms } from "../fetch";
import BoardList from "../Board/BoardList";

interface State {
  myRooms: Array<Posts>;
}
interface Props {
  navigation: any;
}
interface Posts {
  id: number;
  host_name: string;
  location_name: string;
  date: string;
  spotName: string;
}
export default class MyRooms extends Component<Props, State> {
  state = {
    myRooms: []
  };
  async componentDidMount() {
    let token = await AsyncStorage.getItem("userToken");

    let roomList = await GetMyRooms(token);

    await this.setState({
      ...this.state,
      myRooms: roomList
    });
  }

  render() {
    return (
      <ScrollView>
        {this.state.myRooms.map(data => (
          <BoardList
            key={data["id"]}
            hostName={data["host_name"]}
            Date={data["date"]}
            local={data["location_name"]}
            PostId={data["id"]}
            spotName={data["spot_name"]}
            navigation={this.props.navigation}
          />
        ))}
      </ScrollView>
    );
  }
}
