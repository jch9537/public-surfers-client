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
  text: string;
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
  public focusListener: any;
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

    //화면 띄웠을때 항상 방목록 다시 불러오기.
    this.focusListener = await this.props.navigation.addListener(
      "didFocus",
      async () => {
        let dataChunk: any = await GetRoomlistOrGetRoominfo(`${token}`);
        let boardList = await dataChunk.json();

        await this._sortByDate(boardList);

        await this.setState({
          ...this.state,
          board: boardList,
          filteredBoard: boardList
        });
      }
    );
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

  async _sortByDate(array: Posts[]) {
    await array.sort((a: Posts, b: Posts) => {
      if (a.date > b.date) {
        return 1;
      } else if (a.date < b.date) {
        return -1;
      }
      return 0;
    });
  }

  render() {
    // console.log("this.state", this.state.board);
    return (
      <View>
        <Choice list={this.state.ListLocal} func={this.changeLocal} />
        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
          {this.state.filteredBoard.reverse().map((item: any) => (
            <BoardList
              key={item["id"]}
              hostName={item["host_name"]}
              Date={item["date"]}
              local={item["location_name"]}
              navigation={this.props.navigation}
              PostId={item["id"]}
              participate={item["participate"]}
              spotName={item.spot_name}
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
