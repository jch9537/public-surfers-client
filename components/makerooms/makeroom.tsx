import * as React from "react";
import { View, Text, StyleSheet, ViewStyle, SafeAreaView } from "react-native";
import Logout from "../utils/logout";
import Inputroom from "./inputroom";

interface Style {
  room: ViewStyle;
}

interface MakeRoomProps {
  navigation: any;
}

class MakeRoom extends React.Component<MakeRoomProps> {
  constructor(props: MakeRoomProps) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={styles.room}>
        <Inputroom navigation={this.props.navigation}></Inputroom>
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
