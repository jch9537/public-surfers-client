import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from "react-native";
import * as Google from "expo-google-app-auth";
import { ClientId } from "./MyID";
interface Props {
  navigation: any;
}
export default class google extends Component<Props> {
  signInGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        clientId: ClientId
      });
      if (result.type === "success") {
        const { email, givenName } = result.user;
        this.props.navigation.navigate("Main");
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <TouchableOpacity style={Styles.default} onPress={this.signInGoogle}>
        <View style={Styles.button}>
          <Text style={{ opacity: 0.5 }}>Sign in with </Text>
          <Text style={{ color: "#2196f3" }}>G</Text>
          <Text style={{ color: "#ea2c2c" }}>o</Text>
          <Text style={{ color: "#f2d563" }}>o</Text>
          <Text style={{ color: "#2196f3" }}>g</Text>
          <Text style={{ color: "#43b52d" }}>l</Text>
          <Text style={{ color: "#ea2c2c" }}>e</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const Styles = StyleSheet.create({
  text: {
    padding: 20,
    height: 60,
    alignItems: "center"
  },
  button: {
    fontSize: 18,
    width: 220,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  default: {
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    fontSize: 60,
    opacity: 0.2,
    marginBottom: 200
  }
});
