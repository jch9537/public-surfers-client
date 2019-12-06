import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  SafeAreaView,
  ImageBackground
} from "react-native";
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
      <ImageBackground
        source={require("../../assets/images/sunset4.jpg")}
        style={styles.room}
      >
        <Inputroom navigation={this.props.navigation}></Inputroom>
      </ImageBackground>
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
