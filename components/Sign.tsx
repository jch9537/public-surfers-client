import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground
} from "react-native";
import SignPage from "./signPage/signPage";
import Google from "./signPage/google";

interface Props {
  navigation: any;
}

export default class App extends React.Component<Props> {
  static navigationOptions = { header: Google };

  render() {
    return (
      <ImageBackground
        style={Styles.wrap}
        source={require("../assets/images/login_background.jpg")}
      >
        <KeyboardAvoidingView behavior="position" style={{}}>
          <SignPage></SignPage>
          <Google navigation={this.props.navigation} />
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}
const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
