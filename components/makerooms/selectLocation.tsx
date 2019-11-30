import * as React from "react";
import { Picker, View, Text } from "react-native";

export interface SelectLocationProps {
  location: string[] | null;
  checkLocation: any;
}

export interface SelectLocationState {
  location: string;
}

class SelectLocation extends React.Component<
  SelectLocationProps,
  SelectLocationState
> {
  state = { location: "" };
  updateLocation = (local: string) => {
    this.setState({ location: local });
  };
  render() {
    // console.log('셀렉트로케이션 프롭', this.props);
    return (
      <View>
        <Picker
          selectedValue={this.state.location}
          style={{
            height: 70,
            width: "100%",
            alignItems: "center"
          }}
          onValueChange={itemValue => {
            this.updateLocation(itemValue);
            this.props.checkLocation(itemValue);
          }}
        >
          <Picker.Item key="unselectedItem" label="지역선택"></Picker.Item>
          {this.props.location.map((item: any) => (
            <Picker.Item label={item} value={item} key={item} />
          ))}
        </Picker>
      </View>
    );
  }
}

export default SelectLocation;
