import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  AsyncStorage
} from "react-native";
import { GetRoomlistOrGetRoominfo } from "../fetch";
import { fakeBoard } from "../fakeData/board";
import BoardList from "./BoardList";
import Choice from "./Choice";
import { BooleanLiteral } from "@babel/types";

interface Props {
  navigation: any;
}

interface Posts {
  id: number;
  host_id: number;
  host_name: string;
  location_name: string;
  date: string;
  participate: boolean;
  spot_name: string;
  text: string
}

interface State {
  board: Posts[];
  filteredBoard: Posts[];
  spotList: string[];
  date: string;
  ListLocal: string[];
  pickLocal: string;
}
export default class Board extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.changeLocal = this.changeLocal.bind(this);
  }

  state: State = {
    board: [],
    ListLocal: ["모든지역", "제주도", "강원도", "부산", "기타"],
    spotList: [],
    pickLocal: "",
    filteredBoard: [],
    date: ""
  };
  async componentDidMount() {
    let token = await AsyncStorage.getItem("userToken");
    console.log("board token", token)
    return GetRoomlistOrGetRoominfo(`${token}`)
      .then(res => {
        console.log("Res", res)
        if (res["status"] === 200) {
          return res.json();
        } else {
          Alert.alert("다음번에..");
        }
      })
      .then(res => {
        console.log("res", res)
        let data = this.state.board.concat(res);
        console.log("DAta", data)
        return this.setState({
          board: data,
          filteredBoard: data
        })
      })
  }
  changeLocal = (value: string): any => {
    if (value === "모든지역") {
      let newLocalList = this.state.ListLocal.slice();
      if (this.state.ListLocal[0] !== "모든지역") {
        newLocalList.shift();
      }
      this.setState({
        ...this.state,
        filteredBoard: this.state.board,
        ListLocal: newLocalList
      });
    }

    if (value !== "모든지역") {
      let choices: Array<Posts> = [];
      for (let i = 0; i < this.state.board.length; i++) {
        if (this.state.board[i].location_name === value) {
          choices.push(this.state.board[i]);
        }
      }
      let newLocalList = this.state.ListLocal.slice();
      if (this.state.ListLocal[0] === "모든지역") {
        newLocalList.unshift(value);
      }
      if (this.state.ListLocal[0] !== "모든지역") {
        newLocalList.shift();
        newLocalList.unshift(value);
      }
      this.setState({
        ...this.state,
        filteredBoard: choices,
        ListLocal: newLocalList
      });
    }
  };

  render() {
    console.log("this.state", this.state.board)
    return (
      <View>
        <Choice list={this.state.ListLocal} func={this.changeLocal} />
        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
          {this.state.filteredBoard.map((item: any) => (
            <BoardList
              key={item["id"]}
              hostName={item["host_name"]}
              Date={item["date"]}
              local={item["location_name"]}
              navigation={this.props.navigation}
              PostId={item["id"]}
              participate={item["participate"]}
            />
          ))}
          <Text style={{ paddingBottom: 30 }}> </Text>
        </ScrollView>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  background: { height: "100%" }
});
