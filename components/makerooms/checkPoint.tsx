import * as React from "react";
import { Picker, View, Text } from "react-native";

export interface CheckPointProps {
  detailLocation: string[];
  checkSpot: any;
}

export interface CheckPointState {
  surfPoint: string;
}

class CheckPoint extends React.Component<CheckPointProps, CheckPointState> {
  state = { surfPoint: "" };
  render() {
    // console.log('체크포인트 프롭', this.props.checkSpot);
    return (
      <View>
        <Picker
          selectedValue={this.state.surfPoint}
          style={{
            height: 70,
            width: "100%",
            alignItems: "center"
          }}
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
