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
  Alert,
  AsyncStorage
} from "react-native";
import AdBanner from "./AdBanner";

interface Props {
  navigation: any;
}
interface State {
  fontend: boolean;
}
interface Style {
  button: ViewStyle;
  afterFont: TextStyle;
  wrap: ViewStyle;
  banner: ViewStyle;
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
      NanumPenScript: require("../assets/NanumPenScript-Regular.ttf"),
      gaegu_regular: require("../assets/fonts/Gaegu-Regular.ttf")
    });
    this.setState({
      fontend: true
    });

    await this._getUserToken();
  }

  async _getUserToken() {
    let result = await AsyncStorage.getItem("userToken");

    console.log("userToken: ", result);
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/images/main_background.jpg")}
        style={Styles.wrap}
      >
        <View style={{ marginBottom: "50%" }}>
          <TouchableOpacity
            style={Styles.button}
            onPress={() => this.props.navigation.navigate("MakeRoom")}
          >
            <Text
              style={this.state.fontend ? Styles.afterFont : { fontSize: 20 }}
            >
              서퍼 모집하기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.button}
            onPress={() => this.props.navigation.navigate("Board")}
          >
            <Text
              style={this.state.fontend ? Styles.afterFont : { fontSize: 20 }}
            >
              서핑 참여하기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.button}
            onPress={() => this.props.navigation.navigate("MyRoomList")}
          >
            <Text
              style={this.state.fontend ? Styles.afterFont : { fontSize: 20 }}
            >
              나의 방 목록
            </Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.banner}>
          <AdBanner />
        </View>
      </ImageBackground>
    );
  }
}
const Styles = StyleSheet.create<Style>({
  button: {
    backgroundColor: "#e5ffe5",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 180,
    elevation: 5,
    marginBottom: 50,
    borderRadius: 10
  },
  afterFont: {
    fontFamily: "gaegu_regular",
    fontSize: 25
  },
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  banner: {
    position: "absolute",
    bottom: 0
  }
});
