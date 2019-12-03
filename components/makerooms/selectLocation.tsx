import * as React from "react";
import { Picker, View, Text, StyleSheet } from "react-native";
// import * as Font from "expo-font";

export interface SelectLocationProps {
  location: string[];
  checkLocation: any;
}

export interface SelectLocationState {
  location: string;
  fontend: boolean;
}

class SelectLocation extends React.Component<
  SelectLocationProps,
  SelectLocationState
> {
  state = { location: "", fontend: false };
  updateLocation = (local: string) => {
    this.setState({ location: local });
  };

  // async componentDidMount() {
  //   await Font.loadAsync({
  //     gaegu_regular: require("../../assets/fonts/Gaegu-Regular.ttf")
  //   });
  //   this.setState({ fontend: true });
  //   // this.setState({ photo: require("../../assets/images/surfer.png") });
  // }
  render() {
    // console.log("셀렉트로케이션 프롭", this.props);
    return (
      <View>
        <Picker
          // style={styles.picker}
          selectedValue={this.state.location}
          onValueChange={itemValue => {
            this.updateLocation(itemValue);
            this.props.checkLocation(itemValue);
          }}
        >
          <Picker.Item key="unselectedItem" label="지역선택"></Picker.Item>
          {/* this.props를 null로 돌리면 문제생김 */}
          {this.props.location.map((item: any) => (
            <Picker.Item label={item} value={item} key={item} />
          ))}
        </Picker>
      </View>
    );
  }
}

export default SelectLocation;

const styles = StyleSheet.create({
  picker: {
    fontFamily: "gaegu_regular"
  }
});
