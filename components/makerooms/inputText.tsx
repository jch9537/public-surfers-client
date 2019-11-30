import * as React from "react";
import { View, Text, TextInput, Button } from "react-native";

export interface InputTextProps {
  textInput: any;
}

export interface InputTextState {}

class InputText extends React.Component<InputTextProps, InputTextState> {
  state = { text: "" };
  render() {
    return (
      <View>
        <Text>내용 : </Text>
        <TextInput
          placeholder="내용을 적으세요"
          onChangeText={text => this.setState({ text: text })}
        ></TextInput>
        <Button
          title="텍스트넣기"
          onPress={() => this.props.textInput(this.state.text)}
        ></Button>
      </View>
    );
  }
}

export default InputText;
