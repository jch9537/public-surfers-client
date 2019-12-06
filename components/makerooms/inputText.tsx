import * as React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Font from "expo-font";

export interface InputTextProps {
  textInput: any;
}

export interface InputTextState {
  fontend: boolean;
}

class InputText extends React.Component<InputTextProps, InputTextState> {
  state = {
    fontend: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      gaegu_regular: require("../../assets/fonts/Gaegu-Regular.ttf")
    });
    await this.setState({ fontend: true });
  }
  render() {
    return (
      // <ImageBackground
      //   source={require("../../assets/images/sunset2.jpg")}
      //   style={styles.textInput}
      // >
      <View style={styles.textInput}>
        <View style={{ flex: 2 }}>
          <TextInput
            style={{ fontFamily: "gaegu_regular", fontSize: 22 }}
            placeholder="내용을 적으세요(모임시간, 모임장소)"
            onChangeText={text => this.props.textInput(text)}
          ></TextInput>
        </View>
      </View>
      /* <View
          style={{
            flex: 1,
            // backgroundColor: "blue",
            alignItems: "center",
            justifyContent: "flex-end"
          }}
        >
          <TouchableOpacity
            style={styles.botton}
            onPress={() => this.props.textInput(this.state.text)}
          >
            <Text
              style={{
                fontFamily: "gaegu_regular",
                fontSize: 25,
                color: "navy"
              }}
            >
              내용넣기
            </Text>
          </TouchableOpacity>
        </View> */
      // </ImageBackground>
    );
  }
}

export default InputText;

const styles = StyleSheet.create({
  textInput: {
    top: 10,
    flex: 1
  }
  // botton: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   height: 40,
  //   width: 120,
  //   // backgroundColor: "powderblue",
  //   borderRadius: 10
  // }
});
