import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";
import { Input, Icon } from "react-native-elements";
import * as Font from "expo-font";
import { userSignup } from "../fetch";

export interface State {
  name: string;
  email: string;
  password: string;
  phone: string;
  error: boolean;
  fontLoaded: boolean;
}
export default class sigininpage extends Component<{}, State> {
  state = {
    name: "",
    email: "",
    password: "",
    phone: "",
    error: true,
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

  ChangeState = (value: string, key: any) => {
    if (value.length > 0) {
      const obj = { [key]: value } as Pick<State, keyof State>;
      obj["error"] = false;
      this.setState(obj);
    } else {
      this.setState({
        error: true
      });
    }
  };

  fetchSignUp = () => {
    let body = {
      name: "" + this.state.name,
      email: "" + this.state.email,
      password: "" + this.state.password,
      phone: "" + this.state.phone,
      oAuth: 0,
      img_url:
        "https://www.clipartwiki.com/clipimg/detail/31-312536_surf-icon-illustration.png"
    };
    if (!this.state.error) {
      userSignup(body)
        .then(res => res.json())
        .then(resData => {
          console.log(resData);
          if (resData.message === "회원가입 성공") {
            Alert.alert("성공", "회원가입에 성공하였습니다.");
          } else {
            Alert.alert("error", "이미 사용중인 email입니다.");
          }
        });
    }
    //fetch 요청
  };
  render() {
    return this.state.fontLoaded ? (
      <View style={Styles.wrap}>
        <Input
          placeholder=" Name"
          onChangeText={(text: string) => this.ChangeState(text, "name")}
          leftIcon={
            <Icon name="user" type="antdesign" size={18} color="gray" />
          }
          leftIconContainerStyle={{ marginRight: 15 }}
          inputContainerStyle={{ marginBottom: 5 }}
        />
        <Input
          placeholder=" Email"
          onChangeText={(text: string) => this.ChangeState(text, "email")}
          leftIcon={
            <Icon name="idcard" type="antdesign" size={18} color="gray" />
          }
          leftIconContainerStyle={{ marginRight: 15 }}
          inputContainerStyle={{ marginBottom: 5 }}
        />
        <Input
          placeholder=" Password"
          secureTextEntry={true}
          onChangeText={(text: string) => this.ChangeState(text, "password")}
          leftIcon={<Icon name="key" type="antdesign" size={18} color="gray" />}
          leftIconContainerStyle={{ marginRight: 15 }}
          inputContainerStyle={{ marginBottom: 5 }}
        />
        <Input
          placeholder=" Phone"
          onChangeText={(text: string) => this.ChangeState(text, "phone")}
          leftIcon={
            <Icon name="phone" type="antdesign" size={18} color="gray" />
          }
          leftIconContainerStyle={{ marginRight: 15 }}
          inputContainerStyle={{ marginBottom: 5 }}
        />
        <TouchableOpacity onPress={this.fetchSignUp} style={Styles.button}>
          <Text style={{ fontFamily: "gaegu_regular", fontSize: 23 }}>
            회원가입
          </Text>
        </TouchableOpacity>
      </View>
    ) : null;
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
    backgroundColor: "#e5ffe5",
    height: 40,
    width: 150,
    marginBottom: 10,
    marginTop: 15,
    elevation: 3,
    borderRadius: 8
  }
});
