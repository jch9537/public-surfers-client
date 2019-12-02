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
  PushNotificationIOS,
  Alert
} from "react-native";
import * as Font from "expo-font";
// import ImagePicker from "react-native-image-picker";

export interface UserInfoProps {
  editInfo: any;
}

export interface UserInfoState {
  name: string | null;
  password: string | null;
  photo: Image | null;
  fontend: boolean;
}

class UserInfo extends React.Component<UserInfoProps, UserInfoState> {
  //   constructor(props: UserInfoProps) {
  //     super(props);
  state = {
    name: "",
    password: "",
    photo: null,
    fontend: false
  };

  //   uploadImage = () => {
  //     const options = { noData: true };
  //     ImagePicker.launchImageLibrary(options, res => {
  //       if (res.uri) {
  //         this.setState({ photo: res });
  //       }
  //     });
  //   };

  editName = (name?: string | null): void => {
    // 안적으면 자동으로 void가 됨: 지워도 됨
    console.log("이름", name);
    this.setState({ name: name });
  };

  editCurrPassword = async (password?: string | null): void => {
    console.log("비밀번호", password);
    //fetch를 보내서 현재tokenID와 현재비번과 맞는지 확인 fetch('/user', 'PUT')
    // let checkCurrPassword = await (res) => {
    //     if(비번이 아니면){
    //         Alert.alert('비밀번호가 일치하지 않습니다.')
    //     }
    // }
  };

  editNewPassword = (password?: string | null): void => {
    console.log("비밀번호", password);
    // this.setState({ password: password });
  };

  checkNewPassword = (password?: string | null): void => {
    console.log("비밀번호", password);
  };

  async componentDidMount() {
    await Font.loadAsync({
      gaegu_regular: require("../../assets/fonts/Gaegu-Regular.ttf")
    });
    this.setState({ fontend: true });
  }
  //   }
  render() {
    console.log("프롭확인 ", this.props);
    console.log("인포스테이트", this.state);
    return (
      <View style={styles.container}>
        <View style={styles.inputImg}>
          <Text>이미지삽입</Text>
          {/* {this.state.photo && (
            <Image
              source={{ uri: this.state.photo.uri }}
              style={{ width: 250, height: 250 }}
            ></Image>
          )} */}
          {/* <Button title="사진넣기" onPress={this.uploadImage}></Button> */}
        </View>
        <View style={styles.inputText}>
          {/* <View style={styles.eachTextInput}> */}
          <TextInput
            style={styles.eachTextInput}
            placeholder="변경할 이름을 적어주세요"
            placeholderTextColor="navy"
            onChangeText={name => this.editName(name)}
          />
          {/* <Text>{"New Name: " + this.state.name}</Text> */}
          <TextInput
            style={styles.eachTextInput}
            placeholder="등록된 비밀번호를 적어주세요"
            placeholderTextColor="navy"
            onChangeText={(currPassword): string =>
              this.editCurrPassword(currPassword)
            }
          />
          <TextInput
            style={styles.eachTextInput}
            placeholder="변경할 비밀번호를 적어주세요"
            placeholderTextColor="navy"
            onChangeText={(newPassword): string =>
              this.editNewPassword(newPassword)
            }
          />
          <TextInput
            style={styles.eachTextInput}
            placeholder="새로운 비밀번호 확인"
            placeholderTextColor="navy"
            onChangeText={(checkPassword): string =>
              this.checkNewPassword(checkPassword)
            }
          />
        </View>
        {/* </View> */}
        {/* <TouchableOpacity
            title="Edit"
            style={{ width: 50 }}
            onPress={this.props.editInfo}
          >
            <Text>EDIT</Text>
          </TouchableOpacity> */}
        {/* </View> */}
      </View>
    );
  }
}

export default UserInfo;

interface Style {
  container: ViewStyle;
  inputImg?: ViewStyle;
  inputText?: ViewStyle;
  eachTextInput: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignContent: "center"
  },
  inputImg: {
    flex: 1,
    backgroundColor: "darkseagreen"
  },
  inputText: {
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
    backgroundColor: "violet"
  },
  eachTextInput: {
    width: 300,
    height: 50,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: "gaegu_regular",
    fontSize: 20
  }
});
