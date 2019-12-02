import * as React from "react";
import * as Font from "expo-font";
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
  Alert,
  KeyboardAvoidingView
} from "react-native";

import {
  getFormatDate,
  realTimeWeather,
  // locationInfo,
  locationDetail,
  localPoints
} from "../utils/util";
import { LocationData, posts } from "../fetch";
import SelectLocation from "./selectLocation";
import CheckPoint from "./checkPoint";
import Weather from "./weather";
import InputText from "./inputText";
import AdBanner from "../AdBanner";

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
  fontend: boolean;
  // x: number | null;
  // y: number | null;
}

class Inputroom extends Component<InputroomProps, InputroomState> {
  constructor(props: InputroomProps) {
    super(props);
    this.state = {
      location: null,
      localPoint: "",
      detailLocation: [],
      surfPoint: "",
      date: new Date(),
      dateText: "날짜선택",
      currWeather: null,
      text: "",
      fontend: false
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
        console.log("값은: ", selectDate);
        let selectDateText = getFormatDate(selectDate);
        this.setState({ date: selectDate, dateText: selectDateText });
      }
    } catch ({ code, message }) {
      console.warn(`error `, code, message);
    }
  };

  checkLocation = async (location: any) => {
    if (this.state.dateText === "날짜선택") {
      Alert.alert("날짜를 선택해주세요");
    }
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
    if (!this.state.localPoint) {
      Alert.alert("지역을 선택해주세요");
    }
    // console.log('작은지역선택', spot);
    await this.setState({ surfPoint: spot });
    this.weatherInput();
  };

  weatherInput = async () => {
    console.log("서프포인트", this.state.surfPoint);
    if (this.state.surfPoint) {
      let x: number | undefined;
      let y: number | undefined;
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

  postMakeRoom = () => {
    let data = {
      location: this.state.localPoint,
      spot: this.state.surfPoint,
      date: this.state.dateText,
      text: this.state.text
    };
    if (data.date === "날짜선택") {
      Alert.alert("날짜를 선택해주세요");
    }
    if (!data.location) {
      Alert.alert("지역을 선택해주세요");
    }
    if (!data.spot) {
      Alert.alert("상세 위치를 선택해주세요");
    }
    if (!data.text) {
      Alert.alert("내용을 입력해주세요");
    }
    console.log("데이터 확인 ", data);
    posts("POST", data);
  };

  async componentDidMount() {
    await Font.loadAsync({
      gaegu_regular: require("../../assets/fonts/Gaegu-Regular.ttf")
    });
    const locationInfo = await LocationData("location");
    console.log("패치로케이션인포", locationInfo);
    this.setState({ location: locationInfo });

    //지역패치
  }

  render() {
    console.log("스테이트 상태체크", this.state);
    return (
      <SafeAreaView style={styles.container}>
        {/* 111 */}
        <View style={styles.eachBox1}>
          <View style={styles.eachBox11}>
            <Button
              title={this.state.dateText}
              onPress={() =>
                this.showDatePicker({
                  date: this.state.date
                })
              }
            ></Button>
          </View>
          <View style={styles.eachBox12}>
            <View style={styles.eachBox121}>
              <SelectLocation
                location={this.state.location}
                checkLocation={this.checkLocation}
              ></SelectLocation>
            </View>
            <View style={styles.eachBox122}>
              {/* <CheckPoint
                detailLocation={this.state.detailLocation}
                checkSpot={this.checkSpot}
              ></CheckPoint> */}
            </View>
          </View>
        </View>

        {/* 222 */}
        <View style={styles.eachBox2}>
          {this.state.currWeather ? (
            <Weather currWeather={this.state.currWeather}></Weather>
          ) : null}
        </View>
        {/* 3333 */}
        <View style={styles.eachBox3}>
          <InputText textInput={this.textInput}></InputText>
        </View>
        {/* 444 */}
        <View style={styles.eachBox4}>
          <Button title="방만들기" onPress={this.postMakeRoom}></Button>
        </View>
        <View style={styles.banner}>
          <AdBanner />
        </View>
      </SafeAreaView>
    );
  }
}

export default Inputroom;
interface Style {
  container: ViewStyle;
  eachBox1: ViewStyle;
  eachBox11: ViewStyle;
  eachBox12: ViewStyle;
  eachBox121: ViewStyle;
  eachBox122: ViewStyle;
  eachBox2: ViewStyle;
  eachBox3: ViewStyle;
  eachBox4: ViewStyle;
  // eachBox5: ViewStyle;
  banner: ViewStyle;

  // text: ViewStyle;
  // text1: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    margin: 10
  },
  eachBox1: {
    flex: 1,
    backgroundColor: "pink"
  },
  eachBox11: {
    flex: 1,
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  eachBox12: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "grey"
  },
  eachBox121: {
    flex: 1
  },
  eachBox122: {
    flex: 1
  },

  eachBox2: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "yellow"
  },
  eachBox3: {
    flex: 2,
    backgroundColor: "red",
    padding: 10
  },
  eachBox4: {
    flex: 1,
    fontFamily: "gaegu_regular",

    backgroundColor: "orange"
  },
  banner: {
    position: "absolute",
    bottom: 0
  }
  // eachBox5: {
  //   flex: 0.3,
  //   flexDirection: "row",
  //   backgroundColor: "purple"
  // },
  // text: {
  //   backgroundColor: "brown",
  //   justifyContent: "center",
  //   alignItems: "flex-start"
  // },
  // text1: {
  //   backgroundColor: "grey",
  //   borderColor: "white",
  //   borderWidth: 1,
  //   height: 50,
  //   padding: 10,
  //   margin: 5,
  //   justifyContent: "center",
  //   alignItems: "center"
  // }
});
