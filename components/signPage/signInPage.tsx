import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from "react-native";
import { Input, Icon } from "react-native-elements";
import * as Font from "expo-font";

interface State {
  email: string;
  password: string;
  errorMsg: boolean;
  siginin: boolean;
  fontLoaded: boolean;
  token: any;
}

interface Props {
  navigation: any;
}

export default class sigininpage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  state = {
    email: "",
    password: "",
    errorMsg: true,
    siginin: false,
    fontLoaded: false,
    token: null
  };

  async componentDidMount() {
    await Font.loadAsync({
      nanum_pen: require("../../assets/fonts/NanumPenScript-Regular.ttf"),
      gaegu_regular: require("../../assets/fonts/Gaegu-Regular.ttf")
    });
    await this.setState({
      ...this.state,
      fontLoaded: true
    });
    await this._getUserToken();
  }

  SignIn = async () => {
    let body = {
      email: this.state.email,
      password: this.state.password
    };

    if (!this.state.errorMsg) {
      await fetch("http://54.180.108.45:3000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        credentials: "include"
      })
        .then(res => res.json())
        .then(res => {
          AsyncStorage.setItem("userToken", res.token);
          return res.message;
        })
        .then(res => {
          this._getUserToken();
          if (res === "로그인 완료") {
            this.props.navigation.navigate("MainPart");
          } else {
            Alert.alert("Error", "아이디 혹은 비밀번호가 올바르지 않습니다.");
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

  async _getUserToken() {
    let result = await AsyncStorage.getItem("userToken");

    console.log("userToken: ", result);

    await this.setState({
      ...this.state,
      token: result
    });
  }

  render() {
    return this.state.fontLoaded ? (
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
          <Text style={{ fontFamily: "gaegu_regular", fontSize: 23 }}>
            로그인
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
