import * as React from "react";
import { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ViewStyle,
  SafeAreaView,
  Picker,
  DatePickerAndroid,
  Button,
  Alert
} from "react-native";

import {
  getFormatDate,
  realTimeWeather,
  locationInfo,
  locationDetail,
  localPoints
} from "../utils/util";
import { posts } from "../fetch";
import SelectLocation from "./selectLocation";
import CheckPoint from "./checkPoint";
import Weather from "./weather";
import InputText from "./inputText";

export interface InputroomProps {}

export interface InputroomState {
  location: Array<string> | null;
  localPoint: string | null;
  detailLocation: string[];
  surfPoint: string | any;
  date: Date | null;
  dateText: string;
  currWeather: any;
  text: string;
  // x: number | null;
  // y: number | null;
}
interface Style {
  inputContainer: ViewStyle;
  eachBox: ViewStyle;
  text: ViewStyle;
  text1: ViewStyle;
}

class Inputroom extends Component<InputroomProps, InputroomState> {
  constructor(props: InputroomProps) {
    super(props);
    this.state = {
      location: [],
      localPoint: "",
      detailLocation: [],
      surfPoint: "",
      date: new Date(),
      dateText: "날짜",
      currWeather: null,
      text: ""
      // x: null,
      // y: null
    };
  }
  showDatePicker = async (options: any) => {
    try {
      const { action, year, month, day }: any = await DatePickerAndroid.open(
        options
      );
      if (action !== DatePickerAndroid.dismissedAction) {
        let selectDate = new Date(year, month, day);
        getFormatDate(selectDate);
        // console.log('값은: ', selectDate);
        let selectDateText = getFormatDate(selectDate);
        this.setState({ date: selectDate, dateText: selectDateText });
      }
    } catch ({ code, message }) {
      console.warn(`error `, code, message);
    }
  };

  checkLocation = (location: any) => {
    console.log("큰지역선택", location);
    // console.log('스테이트포인트', this.state);
    this.setState({ localPoint: location });

    //데이터베이스에 넣으면 지워야 할 코드
    for (let i = 0; i < locationDetail.length; i++) {
      if (Object.keys(locationDetail[i])[0] === location) {
        this.setState({ detailLocation: locationDetail[i][location] });
        break;
      }
    }
    // await 빼치 들고와서 하나보냄(): location-> 제주도, 부산, 강원도
  };

  checkSpot = async (spot: any) => {
    // console.log('작은지역선택', spot);
    await this.setState({ surfPoint: spot });
    this.weatherInput();
  };

  weatherInput = async () => {
    console.log("서프포인트", this.state.surfPoint);
    if (this.state.surfPoint) {
      let x;
      let y;
      for (let i = 0; i < localPoints.length; i++) {
        if (Object.keys(localPoints[i])[0] === this.state.surfPoint) {
          x = localPoints[i][this.state.surfPoint].x;
          y = localPoints[i][this.state.surfPoint].y;
          break;
        }
      }
      let resultWeather = await realTimeWeather(x, y);
      this.setState({ currWeather: resultWeather });
    }
  };

  textInput = (text: string) => {
    console.log("값 ", text);
    this.setState({ text: text });
  };

  postMakeRoom() {
    let body = {
      location: this.state.localPoint,
      spot: this.state.surfPoint,
      date: this.state.dateText,
      text: this.state.text
    };
    posts("POST", body);
  }

  componentDidMount() {
    this.setState({ location: locationInfo });
    //지역패치
  }

  render() {
    console.log("스테이트 상태체크", this.state);
    return (
      <SafeAreaView style={styles.inputContainer}>
        <View style={styles.eachBox}>
          <Button
            // style={styles.text1}
            title={this.state.dateText}
            onPress={() =>
              this.showDatePicker({
                date: this.state.date
              })
            }
          ></Button>
          <SelectLocation
            location={this.state.location}
            checkLocation={this.checkLocation}
          ></SelectLocation>
          <CheckPoint
            detailLocation={this.state.detailLocation}
            checkSpot={this.checkSpot}
          ></CheckPoint>
        </View>
        <View>
          <View>
            {this.state.currWeather ? (
              <Weather currWeather={this.state.currWeather}></Weather>
            ) : null}
          </View>
          <View>
            <InputText textInput={this.textInput}></InputText>
          </View>
          <Button title="방만들기" onPress={this.postMakeRoom}></Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default Inputroom;

const styles = StyleSheet.create<Style>({
  inputContainer: {
    flex: 1
  },
  eachBox: {
    flex: 0.7,
    top: 100,
    backgroundColor: "pink"
  },
  text: {
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  text1: {
    backgroundColor: "grey",
    borderColor: "white",
    borderWidth: 1,
    height: 50,
    padding: 10,
    margin: 5,
    justifyContent: "center",
    alignItems: "center"
  }
});
