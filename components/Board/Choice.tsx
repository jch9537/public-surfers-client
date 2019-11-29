import React, { Component } from "react";
import { View, Picker } from "react-native";

interface Props {
  list: string[];
  func: any;
}
interface Posts {
  id: number;
  host_name: string;
  location_name: string;
  date: string;
}
export default class Choice extends Component<Props, {}> {
  render() {
    return (
      <Picker onValueChange={itemValue => this.props.func(itemValue)}>
        {this.props.list.map((data, index) => (
          <Picker.Item key={index} label={data} value={data}></Picker.Item>
        ))}
      </Picker>
    );
  }
}
