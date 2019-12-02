import * as React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Font from "expo-font";

export interface InputTextProps {
  textInput: any;
}

export interface InputTextState {
  text: string;
  fontend: boolean;
}

class InputText extends React.Component<InputTextProps, InputTextState> {
  state = {
    text: "",
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
      <View style={styles.textInput}>
        <View style={{ flex: 2, backgroundColor: "brown" }}>
          {/* <Text style={{ fontSize: 20 }}>내용 : </Text> */}
          <TextInput
            style={{ fontFamily: "gaegu_regular", fontSize: 20 }}
            placeholder="내용을 적으세요"
            onChangeText={text => this.setState({ text: text })}
          ></TextInput>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "blue",
            alignItems: "center",
            justifyContent: "flex-end"
          }}
        >
          <TouchableOpacity
            style={styles.botton}
            onPress={() => this.props.textInput(this.state.text)}
          >
            <Text style={{ fontFamily: "gaegu_regular", fontSize: 20 }}>
              내용넣기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default InputText;

const styles = StyleSheet.create({
  textInput: {
    flex: 1
  },
  botton: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 120,
    backgroundColor: "powderblue",
    borderRadius: 10
  }
});
