import * as React from "react";
import { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  SafeAreaView,
  Alert,
  Button,
  KeyboardAvoidingView,
  AsyncStorage,
  TouchableOpacity,
  ImageBackground,
  Platform
} from "react-native";
import { Header } from "react-native-elements";
import * as Font from "expo-font";

import Logout from "../utils/logout";
import UserInfo from "./userInfo";
import { userSetting, settingInfo } from "../fetch";

export interface SettingProps {}
export interface SettingState {
  name?: string | null;
  password?: string | null;
  newPassword?: string | null;
  photo?: string | null;
  fontend: boolean;
}

class Setting extends Component<SettingProps, SettingState> {
  state = {
    name: null,
    password: null,
    newPassword: null,
    photo: null,
    fontend: false
  };

  addPhoto = (photo?: any): void => {
    console.log("사진", photo);
  };

  editName = (name?: string | null): void => {
    console.log("이름", name);
    this.setState({ name: name });
  };

  checkCurrPassword = async (password?: string | null) => {
    console.log("비밀번호", password);
    this.setState({ password: password });
  };

  editNewPassword = (password?: string | null): void => {
    if (!this.state.password) {
      Alert.alert("현재 비밀번호를 입력해주세요");
    } else {
      this.setState({ newPassword: password });
    }
    console.log("비밀번호", password);
  };

  matchNewPassword = (password?: string | null): void => {
    console.log("비밀번호", password);
    if (password !== this.state.newPassword) {
      Alert.alert("새로운 비밀번호와 일치하지 않습니다.");
      this.setState({ newPassword: null });
    }
  };

  changeUserInfo = async () => {
    let token = await AsyncStorage.getItem("userToken");
    let body: settingInfo = {
      name: this.state.name,
      currPassword: this.state.password,
      newPassword: this.state.newPassword
      // photo: this.state.photo 이미지는 따로보내기
    };
    if (!(body.name || body.currPassword || body.newPassword)) {
      Alert.alert("수정한 내용이 없습니다.");
    } else {
      console.log(body);
      userSetting("PUT", `${token}`, body)
        .then((res: any) => res.json())
        .then((json: any) => console.log(json));
    }
  };
  async componentDidMount() {
    await Font.loadAsync({
      gaegu_regular: require("../../assets/fonts/Gaegu-Regular.ttf")
    });
    this.setState({ fontend: true });
    // this.setState({ photo: require("../../assets/images/surfer.png") });
  }

  render() {
    // console.log('세팅프롭', this.props);
    console.log("여기스테이트 :", this.state);
    return (
      // <KeyboardAvoidingView
      //   behavior="padding"
      //   enabled
      //   style={styles.setContainer}
      // >
      <View style={styles.setContainer}>
        <ImageBackground
          source={require("../../assets/images/wave3.jpg")}
          style={{ flex: 1, margin: 5 }}
        >
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
            }}
            // rightComponent={{
            //   text: "logout",
            //   style: {
            //     color: "black",
            //     fontSize: 12,
            //     fontWeight: "bold"
            //   }
            // }}
          />
          <View style={styles.infoContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.changeUserInfo}
            >
              <Text
                style={{
                  fontFamily: "gaegu_regular",
                  fontSize: 22,
                  color: "navy"
                }}
              >
                회원정보 수정
              </Text>
            </TouchableOpacity>
            <UserInfo
              addPhoto={this.addPhoto}
              editName={this.editName}
              checkCurrPassword={this.checkCurrPassword}
              editNewPassword={this.editNewPassword}
              matchNewPassword={this.matchNewPassword}
            ></UserInfo>
          </View>
        </ImageBackground>
        {/* </KeyboardAvoidingView> */}
      </View>
    );
  }
}

export default Setting;

interface Style {
  setContainer: ViewStyle;
  infoContainer: ViewStyle;
  button: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  setContainer: {
    flex: 1
    // resizeMode: "contain"
    // padding: 10
  },
  infoContainer: {
    flex: 1,
    alignItems: "center",
    // margin: 10,
    padding: 10
    // backgroundColor: "yellow"
  },
  button: {
    top: 15,
    width: 150,
    height: 40,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "gaegu_regular",
    backgroundColor: "#A4DBFF",
    borderRadius: 10
  }
});
