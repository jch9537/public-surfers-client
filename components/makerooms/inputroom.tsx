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
    locationDetail
} from '../utils/util';

export interface InputroomProps {}

export interface InputroomState {
    location: Array<string>;
    point: string;
    detailLocation: any;
    surfPoint: string | null;
    date: Date | null;
    dateText: string;
    currWeather: any;
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
            point: '',
            detailLocation: locationDetail,
            surfPoint: null,
            date: new Date(),
            dateText: '날짜',
            currWeather: null
        };
        this.showDatePicker.bind(this);
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
                console.log('값은: ', selectDate);
                let selectDateText = getFormatDate(selectDate);
                this.setState({ date: selectDate, dateText: selectDateText });
            }
        } catch ({ code, message }) {
            console.warn(`error `, code, message);
        }
    };

    setDetailLocation(spot) {
        console.log('큰지역선택', spot);
    }

    fetchWeather() {
        if (!(this.state.date && this.state.location)) {
            Alert.alert('입력오류', '지역과 날짜를 선택해 주세요', [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
            ]);
        }
        // let body = {
        //     date: this.state.date,
        //     location: this.state.location
        // }; //확인차 넣음 나중에 빼기
        // console.log('빼치', body);
        // fetchAPI('/기상청API', 'GET');
        let takedWeather = realTimeWeather();
        this.setState({ currWeather: takedWeather });
    }

    render() {
        console.log(this.state);
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

                    <Picker
                        selectedValue={this.state.location}
                        style={{
                            height: 70,
                            width: '100%',
                            alignItems: 'center'
                        }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ point: itemValue })
                        }
                    >
                        {this.state.location.map(item => (
                            <Picker.Item label={item} value={item} key={item} />
                        ))}
                    </Picker>

                    {/* 위의 picker에서 선택하면 세부 포인트나오게하기 */}
                    <Picker
                        selectedValue={this.state.surfPoint}
                        style={{
                            height: 70,
                            width: '100%',
                            alignItems: 'center'
                        }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ point: itemValue })
                        }
                    >
                        {this.state.detailLocation.map((obj: any) => {
                            if (obj.hasOwnProperty(this.state.point)) {
                                obj.map((item: any) => {
                                    <Picker.Item
                                        label={item}
                                        value={item}
                                    ></Picker.Item>;
                                });
                            }
                        })}
                        {/* <Picker label="SURF POINT"></Picker> */}
                        {/* 세부포인트를 선택하면 날씨가 나오게 하기 */}
                    </Picker>
                    <View style={styles.text1}>
                        {this.state.currWeather &&
                            this.state.currWeather.map((item: any) => {
                                let key = Object.keys(item)[0];
                                <Text>{`${key}: ${item[key]}`}</Text>;
                            })}
                    </View>
                    <Button title="방만들기" onPress={realTimeWeather}></Button>
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
