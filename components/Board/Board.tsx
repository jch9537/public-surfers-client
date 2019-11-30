import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  ImageBackground
} from "react-native";
import { post } from "../fetch";
import { fakeBoard } from "../fakeData/board";
import BoardList from "./BoardList";
import Choice from "./Choice";

interface Props {
  navigation: any;
}

interface Posts {
  id: number;
  host_name: string;
  location_name: string;
  date: string;
}

interface State {
  board: Array<Posts>;
  filteredBoard: Array<Posts>;
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

  static navigationOptions = ({ navigation }: any) => {
    let headerTitle = "RoomList";
    // let headerTitleStyle = { color: 'black' }; // 띄어쓰기 해야함
    let headerRight = (
      <Text onPress={() => Alert.alert("로그아웃")}>Logout</Text>
    );

    return {
      headerTitle,
      // headerTitleStyle,
      headerRight
      // headerLeft
    };
  };
  state: State = {
    board: [],
    ListLocal: ["모든지역", "제주도", "천안", "부산"],
    spotList: [],
    pickLocal: "",
    filteredBoard: [],
    date: ""
  };
  async componentDidMount() {
    await this.setState({
      board: fakeBoard,
      filteredBoard: fakeBoard
    });
    // post("GET")
    //     .then(res => { console.log("res", res); return res.json() })
    //     .then(data => {
    //         console.log(data);
    //         return this.setState({
    //             board: data
    //         })
    //     })
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
