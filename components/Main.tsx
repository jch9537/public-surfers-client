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
  text: TextStyle;
  wrap: ViewStyle;
  banner: ViewStyle;
}
export default class Main extends Component<Props, State> {
  state = {
    fontend: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      gaegu_regular: require("../assets/fonts/Gaegu-Regular.ttf")
    });
    this.setState({
      fontend: true
    });

    await this._getUserToken();
  }

  async _getUserToken() {
    let result = await AsyncStorage.getItem("userToken");
  }

  render() {
    return this.state.fontend ? (
      <ImageBackground
        source={require("../assets/images/beach1.jpg")}
        style={Styles.wrap}
      >
        <View style={{ marginBottom: "20%" }}>
          <TouchableOpacity
            style={Styles.button}
            onPress={() => this.props.navigation.navigate("MakeRoom")}
          >
            <Text style={Styles.text}>서퍼 모집하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.button}
            onPress={() => this.props.navigation.navigate("Board")}
          >
            <Text style={Styles.text}>서핑 참여하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.button}
            onPress={() => this.props.navigation.navigate("MyRoomList")}
          >
            <Text style={Styles.text}>나의 방 목록</Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.banner}>
          <AdBanner />
        </View>
      </ImageBackground>
    ) : null;
  }
}
const Styles = StyleSheet.create<Style>({
  button: {
    backgroundColor: "#f6f6f6",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 180,
    elevation: 5,
    marginBottom: 50,
    borderRadius: 10
  },
  text: {
    fontFamily: "gaegu_regular",
    fontSize: 25
  },
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  banner: {
    position: "absolute",
    bottom: 0
  }
});
