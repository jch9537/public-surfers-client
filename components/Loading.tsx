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
import { start } from "repl";

export default class Loading extends Component<any, any> {
  public _opacity: any;
  constructor(props: any) {
    super(props);

    this._fadeOut = this._fadeOut.bind(this);
    this._routeToPages = this._routeToPages.bind(this);
    this._getUserToken = this._getUserToken.bind(this);
  }
  state: any = {
    fadeAnim: null
  };

  async componentDidMount() {
    await setTimeout(this._routeToPages, 3500);

    await this._fadeIn();

    await setTimeout(this._fadeOut, 2000);
  }

  async _fadeIn() {
    await this.setState({
      ...this.state,
      fadeAnim: new Animated.Value(0)
    });

    await Animated.timing(
      // Uses easing functions
      this.state.fadeAnim, // The value to drive
      {
        toValue: 0.8,
        duration: 1500,
        delay: 500
      }
    ).start();
  }

  async _fadeOut() {
    await this.setState({
      ...this.state,
      fadeAnim: new Animated.Value(0.8)
    });

    await Animated.timing(
      // Uses easing functions
      this.state.fadeAnim, // The value to drive
      {
        toValue: 0,
        duration: 1500,
        delay: 0
      }
    ).start();
  }

  async _routeToPages() {
    let token = await this._getUserToken();
    console.log("token: ", token);
    if (token === null) {
      this.props.navigation.navigate("SignPart");
    } else {
      this.props.navigation.navigate("MainPart");
    }
  }

  async _getUserToken() {
    let result = await AsyncStorage.getItem("userToken");

    console.log("userToken: ", result);

    return result;
  }

  render() {
    AsyncStorage.clear();
    return (
      <Animated.View
        style={[Styles.container, { opacity: this.state.fadeAnim }]}
      >
        <Image
          source={require("../assets/images/loading.jpg")}
          style={{ width: 200, height: 200 }}
        />
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
