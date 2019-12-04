import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Text, Icon } from "react-native-elements";
import * as Font from "expo-font";

interface Props {
  hostName: string;
  Date: string;
  local: string;
  PostId: number;
  navigation: any;
  participate?: boolean;
  spotName?: string;
}
interface State {
  iconNames: string[];
  fontLoaded: boolean;
  participant: boolean;
}
export default class BoardList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  state: State = {
    iconNames: [],
    fontLoaded: false,
    participant: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      gaegu_regular: require("../../assets/fonts/Gaegu-Regular.ttf"),
      gaegu_bold: require("../../assets/fonts/Gaegu-Bold.ttf")
    });
    this.setState({
      ...this.state,
      fontLoaded: true
    });
  }

  render() {
    return this.state.fontLoaded ? (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("Room", { post_id: this.props.PostId })
        }
        style={
          this.props.participate
            ? Styles.ParticipantWrap
            : Styles.nonParticipantWrap
        }
      >
        <Image
          source={require("../../assets/surfer.png")}
          style={Styles.profileImage}
        />
        <View>
          <Text style={Styles.title}>
            {this.props.Date} {this.props.local} {this.props.spotName}
          </Text>
          <Text style={Styles.hostName}>{`\n${this.props.hostName}`}</Text>
        </View>
        <Icon
          name="arrow-right"
          type="feather"
          size={15}
          containerStyle={Styles.icon}
        />
      </TouchableOpacity>
    ) : null;
  }
}

const Styles = StyleSheet.create({
  nonParticipantWrap: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCDC6",
    backgroundColor: "#ffffff"
  },
  ParticipantWrap: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCDC6",
    backgroundColor: "#f6f6f6"
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 10,
    marginRight: 20
  },
  title: { fontFamily: "gaegu_bold", fontSize: 19 },
  hostName: { fontFamily: "gaegu_regular", fontSize: 15, opacity: 0.4 },
  icon: { opacity: 0.4, position: "absolute", right: 40 }
});
