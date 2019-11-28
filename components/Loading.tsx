import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  Animated,
  AsyncStorage
} from "react-native";

export default class Loading extends Component<any, any> {
  public _opacity: any;
  constructor(props: any) {
    super(props);
    this._opacity = new Animated.Value(0);
  }
  state: any = {
    fadeAnim: new Animated.Value(0)
  };

  async componentDidMount() {
    Animated.timing(
      // Uses easing functions
      this._opacity, // The value to drive
      {
        toValue: 1,
        duration: 300,
        delay: 200
      } // Configuration
    ).start();

    await this._getUserToken();
  }

  async _getUserToken() {
    let result = await AsyncStorage.getItem("userToken");

    console.log("userToken: ", result);
  }

  render() {
    return (
      <Animated.View style={Styles.container}>
        {Math.random() < 0.5 ? (
          <Image source={require("../assets/images/loading1.jpg")} />
        ) : (
          <Image source={require("../assets/images/loading2.jpg")} />
        )}
      </Animated.View>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
