import * as React from 'react';
import { Component } from 'react';
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
} from 'react-native';

import {
    getFormatDate,
    realTimeWeather,
    locationInfo,
    locationDetail,
    localPoints
} from '../utils/util';
import SelectLocation from './selectLocation';
import CheckPoint from './checkPoint';
// import Weather from './weather';

export interface InputroomProps {}

export interface InputroomState {
    location: Array<string>;
    localPoint: string | null;
    detailLocation: string[];
    surfPoint: string | any;
    date: Date | null;
    dateText: string;
    currWeather: any;
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
            location: locationInfo,
            localPoint: null,
            detailLocation: ['SURFPOINT'],
            surfPoint: '',
            date: new Date(),
            dateText: '날짜',
            currWeather: null
            // x: null,
            // y: null
        };
        // this.showDatePicker.bind(this);
    }
    showDatePicker = async (options: any) => {
        try {
            const {
                action,
                year,
                month,
                day
            }: any = await DatePickerAndroid.open(options);
            //any 부분 다른 타입확인해보기
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
        // console.log('큰지역선택', location);
        // console.log('스테이트포인트', this.state);
        this.setState({ localPoint: location });

        for (let i = 0; i < locationDetail.length; i++) {
            if (Object.keys(locationDetail[i])[0] === location) {
                this.setState({ detailLocation: locationDetail[i][location] });
            }
        }
        // console.log('스테이트 변경', this.state.detailLocation);
    };

    checkSpot = (spot: any) => {
        // console.log('작은지역선택', spot);
        this.setState({ surfPoint: spot });
    };

    weatherInput = async () => {
        console.log('서프포인트', this.state.surfPoint);
        let x;
        let y;
        for (let i = 0; i < localPoints.length; i++) {
            if (Object.keys(localPoints[i])[0] === this.state.surfPoint) {
                x = localPoints[i][this.state.surfPoint].x;
                y = localPoints[i][this.state.surfPoint].y;
            }
        }
        console.log('엑스와이', x, '================', y);
        realTimeWeather(x, y).then((res: any): void =>
            console.log('결과값', res)
        );

        console.log('결과값', resultWeather);
        this.setState({ currWeather: resultWeather });
    };

    // fetchWeather() {
    //     if (!(this.state.date && this.state.location)) {
    //         Alert.alert('입력오류', '지역과 날짜를 선택해 주세요', [
    //             { text: 'OK', onPress: () => console.log('OK Pressed') }
    //         ]);
    //     }
    //     // let body = {
    //     //     date: this.state.date,
    //     //     location: this.state.location
    //     // }; //확인차 넣음 나중에 빼기
    //     // console.log('빼치', body);

    //     let takedWeather = realTimeWeather();
    //     this.setState({ currWeather: takedWeather });
    // }

    componentDidUpdate() {
        // this.weatherInput();
    }

    // componentDidMount() {
    //     this.setState({ location: locationInfo });
    // }

    render() {
        console.log('스테이트 상태체크', this.state);
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
                        selectLocation={this.state.location}
                        checkLocation={this.checkLocation}
                    ></SelectLocation>
                    <CheckPoint
                        detailLocation={this.state.detailLocation}
                        checkSpot={this.checkSpot}
                    ></CheckPoint>
                    <Button
                        title="날씨확인"
                        onPress={this.weatherInput}
                    ></Button>
                </View>
                <View>
                    {/* <View>
                        <Weather surfPoint={this.state.surfPoint}></Weather>
                    </View> */}
                    <Button
                        title="방만들기"
                        onPress={this.weatherInput}
                    ></Button>
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
        backgroundColor: 'pink'
    },
    text: {
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    text1: {
        backgroundColor: 'grey',
        borderColor: 'white',
        borderWidth: 1,
        height: 50,
        padding: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
