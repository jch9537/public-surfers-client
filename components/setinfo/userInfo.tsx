import * as React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  Button,
  KeyboardAvoidingView,
  Alert,
  ImageBackground,
  SafeAreaView
} from "react-native";
import * as Font from "expo-font";
import {
  Foundation,
  Feather,
  MaterialIcons,
  AntDesign
} from "react-native-vector-icons";
// import ImagePicker from "react-native-image-picker";

export interface UserInfoProps {
  addPhoto: any;
  editName: any;
  checkCurrPassword: any;
  editNewPassword: any;
  matchNewPassword: any;
  // photo: any;
}

export interface UserInfoState {
  checkPassword: string | null;
  fontend: boolean;
}

class UserInfo extends React.Component<UserInfoProps, UserInfoState> {
  // constructor(props: UserInfoProps) {
  //   super(props);

  state = {
    checkPassword: "",
    fontend: false
  };

  clearInput = React.createRef();
  //   uploadImage = () => {
  //     const options = { noData: true };
  //     ImagePicker.launchImageLibrary(options, res => {
  //       if (res.uri) {
  //         this.setState({ photo: res });
  //       }
  //     });
  //   };

  checkNewPassword = (password: string | null) => {
    this.setState({ checkPassword: password });
  };

  async componentDidMount() {
    await Font.loadAsync({
      gaegu_regular: require("../../assets/fonts/Gaegu-Regular.ttf")
    });
    this.setState({ fontend: true });
  }
  //   }
  render() {
    // console.log("프롭확인 ", this.props);
    console.log("인포스테이트", this.state);
    return (
      <View style={styles.container}>
        <View style={styles.inputText}>
          <View style={styles.inputTextContainer}>
            <View style={styles.eachContainer}>
              <Feather name="user" size={27} />
              <TextInput
                style={styles.eachTextInput}
                placeholder="변경할 이름"
                placeholderTextColor="navy"
                onChangeText={name => this.props.editName(name)}
              />
            </View>
            <View style={styles.eachContainer}>
              <MaterialIcons name="lock-open" size={27} />
              <TextInput
                style={styles.eachTextInput}
                placeholder="등록된 비밀번호"
                placeholderTextColor="navy"
                onChangeText={(currPassword): string =>
                  this.props.checkCurrPassword(currPassword)
                }
              />
            </View>
            <View style={styles.eachContainer}>
              <MaterialIcons name="lock-outline" size={27} />
              <TextInput
                style={styles.eachTextInput}
                placeholder="변경할 비밀번호"
                placeholderTextColor="navy"
                onChangeText={(newPassword): string =>
                  this.props.editNewPassword(newPassword)
                }
              />
            </View>
            <View style={styles.eachContainer}>
              <Feather name="check" size={27} />
              <TextInput
                style={styles.eachTextInput}
                placeholder="변경할 비밀번호 확인"
                placeholderTextColor="navy"
                onChangeText={checkPassword =>
                  this.checkNewPassword(checkPassword)
                }
              ></TextInput>
              <TouchableOpacity
                style={styles.button1}
                onPress={() =>
                  this.props.matchNewPassword(this.state.checkPassword)
                }
              >
                <Text
                  style={{
                    fontFamily: "gaegu_regular",
                    fontSize: 22,
                    color: "black"
                  }}
                >
                  V 확인
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputImg}>
              {/* <Text>이미지삽입</Text>
                      {this.props.photo && ( */}
              <Image
                source={require("../../assets/images/surfer2.png")}
                style={{
                  width: 170,
                  height: 170,
                  borderRadius: 170 / 2
                }}
              ></Image>
              {/* )} */}
              {/* <Button title="사진넣기" onPress={this.uploadImage}></Button> */}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default UserInfo;

interface Style {
  container: ViewStyle;
  inputImg?: ViewStyle;
  inputText?: ViewStyle;
  inputTextContainer: ViewStyle;
  eachContainer: ViewStyle;
  eachTextInput: ViewStyle;
  button1: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    resizeMode: "contain",
    // top: 0,
    flex: 1,
    alignContent: "center"
  },
  inputImg: {
    flex: 1,
    top: 45,
    alignItems: "center"
    // backgroundColor: "darkseagreen"
  },
  inputText: {
    alignItems: "center",
    // justifyContent: "center",
    flex: 2
    // backgroundColor: "violet"
  },
  inputTextContainer: {
    top: 30,
    width: 320,
    height: 240
    // backgroundColor: "white"
  },
  eachContainer: {
    flexDirection: "row",
    alignItems: "center"
    // backgroundColor: "blue"
  },
  eachTextInput: {
    width: 230,
    height: 50,
    margin: 6,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    fontFamily: "gaegu_regular",
    fontSize: 20
  },
  button1: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 60
    // backgroundColor: "white",
    // borderRadius: 5
  }
});
