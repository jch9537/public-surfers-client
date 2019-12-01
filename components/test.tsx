import React from "react";
import { View, Text, AsyncStorage } from "react-native";

interface TestProps {}
interface TestState {}

export default class Test extends React.Component<TestProps, TestState> {
  constructor(props: TestProps) {
    super(props);
  }

  async componentDidMount() {
    let token: any = await AsyncStorage.getItem("userToken");
    console.log("token: ", token);
    await fetch("http://15.164.218.247:3000/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify({}),
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }

  render() {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}></View>
    );
  }
}
