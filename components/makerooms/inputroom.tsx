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

import fetchAPI from '../fetch';

export interface InputroomProps {}

export interface InputroomState {
    location: string | null;
    date: Date | null;
    dateText: string;
}
// interface newdateType {
//     currDate: Date;
//     dateText: string;
// }

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
            location: null,
            date: new Date(),
            dateText: '날짜'
        };
        this.showDatePicker.bind(this);
    }
    getFormatDate = (date: Date): string => {
        var year = date.getFullYear(); //yyyy
        var month: number | string = 1 + date.getMonth(); //M
        month = month >= 10 ? month : '0' + month; //month 두자리로 저장
        var day: number | string = date.getDate(); //d
        day = day >= 10 ? day : '0' + day; //day 두자리로 저장
        return year + '년 ' + month + '월 ' + day + '일';
    };

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
                this.getFormatDate(selectDate);
                console.log('값은: ', selectDate);
                let selectDateText = this.getFormatDate(selectDate);
                this.setState({ date: selectDate, dateText: selectDateText });
            }
        } catch ({ code, message }) {
            console.warn(`error `, code, message);
        }
    };

    fetchWeather() {
        if (!(this.state.date && this.state.location)) {
            Alert.alert('입력오류', '지역과 날짜를 선택해 주세요', [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
            ]);
        }
        let body = {
            date: this.state.date,
            location: this.state.location
        }; //확인차 넣음 나중에 빼기
        console.log('빼치', body);
        // fetchAPI('/기상청API', 'GET');
    }

    render() {
        console.log(this.state);
        return (
            <SafeAreaView style={styles.inputContainer}>
                <View style={styles.eachBox}>
                    <Picker
                        selectedValue={this.state.location}
                        style={{ height: 50, width: 100 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ location: itemValue })
                        }
                    >
                        <Picker.Item label="지역" value="부산" />
                        <Picker.Item label="부산" value="부산" />
                        <Picker.Item label="제주" value="제주" />
                        <Picker.Item label="강원도" value="강원도" />
                    </Picker>
                    <Button
                        // style={styles.text1}
                        title={this.state.dateText}
                        onPress={() =>
                            this.showDatePicker({
                                date: this.state.date
                            })
                        }
                    ></Button>
                    {/* <Input
                        placeholder="INPUT WITH ICON"
                        leftIcon={{
                            type: 'font-awesome',
                            name: 'chevron-left'
                        }}
                    /> */}
                    <Text style={styles.text1}>시간</Text>
                    {/* 시간 추가 : TimePickerAndroid */}
                    <Text style={styles.text1}>날씨확인</Text>
                    {/* 날씨는 지역과 날짜를 토대로 API보내기 */}
                    <Button
                        title="방만들기"
                        onPress={() => this.fetchWeather()}
                    ></Button>
                </View>
            </SafeAreaView>
        );
    }
}

export default Inputroom;

const styles = StyleSheet.create<Style>({
    inputContainer: {
        flex: 1,
        backgroundColor: 'blue'
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
    // text2: {
    //     flex: 1,
    //     backgroundColor: 'yellow',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // text3: {
    //     flex: 1,
    //     backgroundColor: 'yellow',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // text4: {
    //     flex: 1,
    //     backgroundColor: 'yellow',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // }
});
