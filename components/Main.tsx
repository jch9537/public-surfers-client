import React, { Component } from "react";
import * as Font from "expo-font";
import {
  View,
  Text,
  ImageBackground,
  TextStyle,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Alert
} from "react-native";
interface Props {
  navigation: any;
}
interface State {
  fontend: boolean;
}
interface Style {
  Button: ViewStyle;
  buttonDetail: ViewStyle;
  afterFont: TextStyle;
}
export default class Main extends Component<Props, State> {
  static navigationOptions = ({ navigation }: any) => {
    let headerTitle = "Home";
    let headerRight = (
      <Text
        onPress={() => Alert.alert("로그아웃")}
        style={{ padding: 10, fontSize: 15 }}
      >
        Logout
      </Text>
    );
    return {
      headerTitle,
      headerRight
    };
  };
  state = {
    fontend: false
  };
  async componentDidMount() {
    await Font.loadAsync({
      NanumPenScript: require("../assets/NanumPenScript-Regular.ttf")
    });
    this.setState({
      fontend: true
    });
  }
  render() {
    return (
      <View>
        <ImageBackground
          source={require("./image/board.jpg")}
          style={{ width: 500, height: 580, justifyContent: "center" }}
        >
          <View style={styles.Button}>
            <TouchableOpacity
              style={styles.buttonDetail}
              onPress={() => this.props.navigation.navigate("MakeRoom")}
            >
              <Text
                style={this.state.fontend ? styles.afterFont : { fontSize: 20 }}
              >
                서퍼 모집하기
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.Button}>
            <TouchableOpacity
              style={styles.buttonDetail}
              onPress={() => this.props.navigation.navigate("Board")}
            >
              <Text
                style={this.state.fontend ? styles.afterFont : { fontSize: 20 }}
              >
                서핑 참여하기
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.Button}>
            <TouchableOpacity
              style={styles.buttonDetail}
              onPress={() => this.props.navigation.navigate("MyRoomList")}
            >
              <Text
                style={this.state.fontend ? styles.afterFont : { fontSize: 20 }}
              >
                내가 참여한 방
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create<Style>({
  buttonDetail: {
    backgroundColor: "#E3EECD",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 180
  },
  Button: {
    alignItems: "baseline",
    padding: 100,
    elevation: 5,
    paddingBottom: 30
  },
  afterFont: {
    fontFamily: "NanumPenScript",
    fontSize: 25
  }
});
