import * as React from "react";
import * as Font from "expo-font";
import { Component } from "react";
import {
  AsyncStorage,
  View,
  StyleSheet,
  ViewStyle,
  SafeAreaView,
  DatePickerAndroid,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native";

import { getFormatDate, realTimeWeather } from "../utils/weatherUtil";
import { GetLocationOrSpot, makeRoom } from "../fetch";
import SelectLocation from "./selectLocation";
import CheckPoint from "./checkPoint";
import Weather from "./weather";
import InputText from "./inputText";
import AdBanner from "../AdBanner";

export interface InputroomProps {
  navigation: any;
}

export interface InputroomState {
  location: Array<string>;
  localPoint: string | null;
  detailLocation: string[];
  spotPoints: Array<object>;
  surfPoint: string | any;
  date: Date | null;
  dateText: string;
  currWeather: any;
  text: string;
  fontend: boolean;
}

class Inputroom extends Component<InputroomProps, InputroomState> {
  constructor(props: InputroomProps) {
    super(props);
    this.state = {
      location: [],
      localPoint: "",
      detailLocation: [],
      spotPoints: [],
      surfPoint: "",
      date: new Date(),
      dateText: "날짜선택",
      currWeather: null,
      text: "",
      fontend: false
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
        // console.log("값은: ", selectDate);
        let selectDateText = getFormatDate(selectDate);
        this.setState({ date: selectDate, dateText: selectDateText });
      }
    } catch ({ code, message }) {
      console.warn(`error `, code, message);
    }
  };

  async componentDidMount() {
    await Font.loadAsync({
      gaegu_regular: require("../../assets/fonts/Gaegu-Regular.ttf")
    });
    let token = await AsyncStorage.getItem("userToken");
    GetLocationOrSpot("location", `${token}`)
      .then(res => res.json())
      .then(json => this.setState({ location: json }));
  }

  checkLocation = async (location: any) => {
    let locationDetail: string[] = [];
    console.log("큰지역선택", location);
    // console.log('스테이트포인트', this.state);
    this.setState({ localPoint: location });
    let token = await AsyncStorage.getItem("userToken");
    GetLocationOrSpot(`${location}`, `${token}`)
      .then(res => res.json())
      .then(json => {
        this.setState({ spotPoints: json });
        for (let i = 0; i < json.length; i++) {
          console.log(Object.keys(json[i])[0]);
          locationDetail.push(Object.keys(json[i])[0]);
        }
        this.setState({ detailLocation: locationDetail });
      });
  };

  checkSpot = async (spot: any) => {
    if (!this.state.localPoint) {
      Alert.alert("지역을 선택해주세요");
    }
    // console.log('작은지역선택', spot);
    await this.setState({ surfPoint: spot });
    await this.weatherInput();
  };

  weatherInput = async () => {
    // console.log("서프포인트", this.state.surfPoint);
    const { surfPoint, spotPoints } = this.state;
    if (surfPoint) {
      let x: any;
      let y: any;
      for (let i = 0; i < spotPoints.length; i++) {
        if (Object.keys(spotPoints[i])[0] === surfPoint) {
          x = spotPoints[i][surfPoint].x;
          y = spotPoints[i][surfPoint].y;
        }
      }
      let resultWeather = await realTimeWeather(x, y);
      this.setState({ currWeather: resultWeather });
    }
  };

  textInput = (text: string) => {
    this.setState({ text: text });
  };

  postMakeRoom = async () => {
    console.log("-----------------------");
    let data = {
      location: this.state.localPoint,
      spot: this.state.surfPoint,
      date: this.state.dateText,
      text: this.state.text
    };
    if (
      data.date === "날짜선택" ||
      !data.location ||
      !data.spot ||
      !data.text
    ) {
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
    } else {
      console.log("데이타", data);
      let token = await AsyncStorage.getItem("userToken");
      console.log(token, "----------------", data);
      return makeRoom(data, `${token}`)
        .then(res => res.json())
        .then(json => {
          console.log(json);
          this.props.navigation.navigate("Room", json);
        });
    }
  };

  render() {
    // console.log("스테이트 상태체크", this.state);
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
        {/* 111 */}
        <View style={styles.eachBox1}>
          {/* <ImageBackground
          source={require("../../assets/images/sky1.png")}
          style={styles.eachBox1}
        > */}
          <View style={styles.eachBox11}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.showDatePicker({
                  date: this.state.date
                })
              }
            >
              <Text
                style={{
                  fontFamily: "gaegu_regular",
                  fontSize: 22,
                  // left: 7,
                  color: "navy"
                }}
              >
                {this.state.dateText}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.eachBox12}>
            <View style={styles.eachBox121}>
              <SelectLocation
                location={this.state.location}
                checkLocation={this.checkLocation}
              ></SelectLocation>
            </View>
            <View style={styles.eachBox122}>
              <CheckPoint
                detailLocation={this.state.detailLocation}
                checkSpot={this.checkSpot}
              ></CheckPoint>
            </View>
          </View>
          {/* </ImageBackground> */}
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
        <View style={styles.eachBox1}>
          <View style={styles.eachBox4}>
            <TouchableOpacity style={styles.button} onPress={this.postMakeRoom}>
              <Text
                style={{
                  fontFamily: "gaegu_regular",
                  fontSize: 22,
                  // left: 7,
                  color: "navy"
                }}
              >
                방만들기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={styles.eachBox4}>
          <Button title="방만들기" onPress={this.postMakeRoom}></Button>
        </View> */}
        <View style={styles.banner}>
          <AdBanner />
        </View>
      </KeyboardAvoidingView>
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
  banner: ViewStyle;
  button: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    top: 10,
    flex: 1,
    margin: 10
  },
  eachBox1: {
    flex: 1
    // backgroundColor: "pink"
  },
  eachBox11: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "gaegu_regular"
  },
  eachBox12: {
    flex: 1,
    flexDirection: "row"
    // backgroundColor: "grey"
  },
  eachBox121: {
    flex: 1
  },
  eachBox122: {
    flex: 1
  },
  eachBox2: {
    flex: 2,
    flexDirection: "row"
    // backgroundColor: "yellow"
  },
  eachBox3: {
    flex: 2,
    // backgroundColor: "red",
    padding: 10
  },
  eachBox4: {
    top: 15,
    flex: 1,
    fontFamily: "gaegu_regular",
    alignItems: "center"
    // backgroundColor: "orange"
  },
  banner: {
    position: "absolute",
    bottom: 0
  },
  button: {
    width: 150,
    height: 35,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "gaegu_regular",
    backgroundColor: "#f6f6f6",
    borderRadius: 10
  }
});
