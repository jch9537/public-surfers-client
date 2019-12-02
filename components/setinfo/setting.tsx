import * as React from "react";
import { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  Alert,
  Button,
  KeyboardAvoidingView
} from "react-native";
import { Header } from "react-native-elements";
// import { Header, Avatar } from 'react-native-elements';

// import MenuBar from './menubar';
import UserInfo from "./userInfo";
import { fetchAPI } from "../fetch";
import SafeAreaView from "react-native-safe-area-view";

export interface SettingProps {}
export interface SettingState {
  name?: any;
  password?: any;
  inputInfo?: any;
}

class Setting extends Component<SettingProps, SettingState> {
  state = { name: null, password: null, inputInfo: null };

  //   static navigationOptions = ({ navigation }: any) => {
  //     let headerTitle = "Setting";
  //     // let headerTitleStyle = { color: 'black' }; // 띄어쓰기 해야함
  //     let headerRight = (
  //       <Text onPress={() => Alert.alert("로그아웃")}>Logout</Text>
  //     );
  //     // let headerLeft = (
  //     //     <Icon name="home" onPress={() => navigation.navigate('Test1')} />
  //     // );

  //     return {
  //       headerTitle,
  //       // headerTitleStyle,
  //       headerRight
  //       // headerLeft
  //     };
  //   };
  editInfo = (): void => {
    const inputInfo = {
      name: this.state.name,
      password: this.state.password
    };
    // fetchAPI('/setting', 'POST', inputInfo); // url넣기
  };

  headerButtonRight = (): void => {
    console.log("안녕");
  };

  render() {
    // console.log('세팅프롭', this.props);
    // console.log('여기스테이트 :', this.state.inputInfo);
    return (
      <SafeAreaView style={styles.setContainer}>
        <Header
          centerComponent={{
            text: "Setting",
            style: {
              color: "black",
              fontSize: 20,
              fontWeight: "bold"
            }
          }}
          containerStyle={{
            backgroundColor: "white",
            justifyContent: "space-around"
            // shadowColor: "black",
            // shadowOffset: { width: 100, height: 100 },
            // shadowOpacity: 1
          }}
        />
        {/* <KeyboardAvoidingView> */}
        <View style={styles.infoContainer}>
          <UserInfo info={this.state} editInfo={this.editInfo}></UserInfo>
        </View>
        {/* </KeyboardAvoidingView> */}
      </SafeAreaView>
    );
  }
}

export default Setting;

interface Style {
  setContainer: ViewStyle;
  infoContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  setContainer: {
    flex: 1
    // backgroundColor: "white"
  },
  infoContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: "yellow"
  }
});
