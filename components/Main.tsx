import React, { Component } from "react";
import { View, Text, Button, StyleSheet, ViewStyle, Alert } from "react-native";

interface Props {
  navigation: any;
}

interface Style {
  total: ViewStyle;
  first: ViewStyle;
  second: ViewStyle;
  third: ViewStyle;
}
export default class Main extends Component<Props> {
  static navigationOptions = ({ navigation }: any) => {
    let headerTitle = "Home";
    // let headerTitleStyle = { color: 'black' }; // 띄어쓰기 해야함
    let headerRight = (
      <Text onPress={() => Alert.alert("로그아웃")}>Logout</Text>
    );
    // let headerLeft = (
    //     <Icon name="home" onPress={() => navigation.navigate('Test1')} />
    // );

    return {
      headerTitle,
      // headerTitleStyle,
      headerRight
      // headerLeft
    };
  };
  render() {
    return (
      <View style={styles.total}>
        <View style={styles.first}>
          <Button
            title="MakeRoom"
            onPress={() => this.props.navigation.navigate("MakeRoom")}
          />
        </View>
        <View style={styles.second}>
          <Button
            title="방 목록 불러오기"
            onPress={() => this.props.navigation.navigate("Board")}
          />
        </View>
        <View style={styles.third}>
          <Button
            title="나의 room"
            onPress={() => this.props.navigation.navigate("MyRoomList")}
          />
        </View>
        {/* <MainContainer /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create<Style>({
  total: {
    flex: 1
  },
  first: {
    flex: 1
  },
  second: {
    flex: 1
  },
  third: {
    flex: 1
  }
});
