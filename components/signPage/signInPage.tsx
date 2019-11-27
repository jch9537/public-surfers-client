import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input, Icon } from "react-native-elements";
import * as Font from "expo-font";

interface State {
  email: string;
  password: string;
  errorMsg: boolean;
  siginin: boolean;
  fontLoaded: boolean;
}

export default class sigininpage extends Component<{}, State> {
  state = {
    email: "",
    password: "",
    errorMsg: true,
    siginin: false,
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      nanum_pen: require("../../assets/fonts/NanumPenScript-Regular.ttf")
    });
    this.setState({
      ...this.state,
      fontLoaded: true
    });
  }

  SignIn = () => {
    const { email, password } = this.state;
    if (!this.state.errorMsg) {
      fetch("url//user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      })
        .then(res => res.json())
        .then(resData => {
          if (resData.status === 200) {
            this.setState({
              siginin: !this.state.siginin
            });
          }
        });
    }
  };

  ChangeState = (value: string, key: any) => {
    if (value.length > 0) {
      const obj = { [key]: value } as Pick<State, keyof State>;
      obj["errorMsg"] = false;
      this.setState(obj);
    } else {
      this.setState({
        errorMsg: !this.state.errorMsg
      });
    }
  };

  render() {
    return (
      <View style={Styles.wrap}>
        <Input
          placeholder=" Email"
          onChangeText={text => this.ChangeState(text, "email")}
          keyboardType="email-address"
          leftIcon={
            <Icon name="idcard" type="antdesign" size={18} color="black" />
          }
        />
        <Input
          placeholder=" Password"
          onChangeText={text => this.ChangeState(text, "password")}
          secureTextEntry={true}
          leftIcon={
            <Icon name="key" type="antdesign" size={18} color="black" />
          }
        />
        <TouchableOpacity onPress={this.SignIn} style={Styles.button}>
          <Text style={{ fontFamily: "nanum_pen", fontSize: 25 }}>로그인</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#63C5DA",
    height: 40,
    width: 150,
    marginBottom: 10,
    marginTop: 15,
    elevation: 3
  }
});
