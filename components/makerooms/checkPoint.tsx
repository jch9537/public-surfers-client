import * as React from "react";
import * as Font from "expo-font";
import { Picker, View, Text, Alert, StyleSheet } from "react-native";

export interface CheckPointProps {
  detailLocation: string[];
  checkSpot: any;
}

export interface CheckPointState {
  surfPoint: string;
  fontent: boolean;
}

class  CheckPoint extends React.Component<CheckPointProps, CheckPointState> {
  state = {
    surfPoint: "",
    fontend: false
  };
  async componentDidMount() {
    await Font.loadAsync({
      gaegu_regular: require("../../assets/fonts/Gaegu-Regular.ttf")
    });
    await this.setState({ fontend: true });
  }
  render() {
    // console.log('체크포인트 프롭', this.props.checkSpot);
    return (
      <View>
        <Picker
          selectedValue={this.state.surfPoint}
          onValueChange={itemValue => {
            this.setState({ surfPoint: itemValue });
            this.props.checkSpot(itemValue);
          }}
        >
          <Picker.Item key="unselectedValue" label="스팟선택"></Picker.Item>
          {this.props.detailLocation.map((item: any) => (
            <Picker.Item label={item} value={item} key={item} />
          ))}
        </Picker>
      </View>
    );
  }
}

export default CheckPoint;
