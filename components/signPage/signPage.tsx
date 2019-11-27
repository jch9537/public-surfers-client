import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import SignIn from "./signInPage";
import SignUp from "./signupPage";
import * as Font from "expo-font";

export default class signpage extends Component {
  state = {
    togglePage: false,
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      nanum_pen: require("../../assets/fonts/NanumPenScript-Regular.ttf"),
      gaegu_regular: require("../../assets/fonts/Gaegu-Regular.ttf")
    });
    this.setState({
      ...this.state,
      fontLoaded: true
    });
  }

  changeToggle = () => {
    this.setState({
      togglePage: !this.state.togglePage
    });
  };

  render() {
    return this.state.fontLoaded ? (
      <KeyboardAvoidingView style={Styles.center}>
        {this.state.togglePage ? <SignUp></SignUp> : <SignIn></SignIn>}
        <TouchableOpacity onPress={this.changeToggle} style={Styles.button}>
          {this.state.togglePage ? (
            <Text style={{ fontFamily: "gaegu_regular", fontSize: 25 }}>
              로그인 하기
            </Text>
          ) : (
            <Text style={{ fontFamily: "gaegu_regular", fontSize: 25 }}>
              회원가입 하기
            </Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    ) : null;
  }
}

const Styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  container: {},
  wrap: {},
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5ffe5",
    height: 40,
    width: 150,
    elevation: 3,
    borderRadius: 8
  }
});
