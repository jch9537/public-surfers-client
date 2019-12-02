import * as React from "react";
import { Component } from "react";
import { View, Text, StyleSheet, ViewStyle, Alert } from "react-native";
import Logout from "../utils/logout";
import Inputroom from "./inputroom";

interface Style {
  room: ViewStyle;
}

class MakeRoom extends Component {
  // state = { :  }
  render() {
    return (
      <SafeAreaView style={styles.room}>
        <Inputroom></Inputroom>
      </SafeAreaView>
    );
  }
}

export default MakeRoom;

const styles = StyleSheet.create<Style>({
  room: {
    flex: 1,
    backgroundColor: "white"
  }
});
