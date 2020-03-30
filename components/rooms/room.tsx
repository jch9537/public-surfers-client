
import React, { Component } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    Alert
} from "react-native";
import { RoomData, roominfo } from "../src/redux/actions";
import { Text } from "react-native-elements";
import Weather from "../makerooms/weather";
import { connect } from "react-redux";
import { GetRoomlistOrGetRoominfo, identifyUser, DeleteRoom, EditRoom, GetLocationOrSpot } from "../fetch";
import AdBanner from "../AdBanner";
import { realTimeWeather } from "../utils/weatherUtil";
import Edit from "../rooms/edit";
interface Props {
    Room: RoomData;
    navigation: any;
    addRoom(obj: RoomData): any;
}
interface State {
    amIHost: boolean;
    edit: boolean;
    editText: string
    weather: object[]
}
class RoomInfo extends Component<Props, State> {
    state: State = {
        amIHost: false,
        edit: false,
        editText: "",
        weather: [],
    };
    async componentDidMount() {
        let token = await AsyncStorage.getItem("userToken");
        let postid = this.props.navigation.state.params.post_id;
        await GetRoomlistOrGetRoominfo(`${token}`, postid)
            .then(res => {
                return res.json();
            })
            .then(res => {
                this.props.addRoom(res);
                this.setState({
                    editText: res["text"]
                })
            });
        let userInfo = await identifyUser(token);
        GetLocationOrSpot(this.props.Room.location_name, `${token}`)
            .then(res => res.json())
            .then(async data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i][this.props.Room.spot_name]) {
                        let result = await realTimeWeather(data[i][this.props.Room.spot_name]["x"], data[i][this.props.Room.spot_name]["y"])
                        this.setState({
                            weather: result
                        })
                    }
                }
            })
        if (this.props.Room.host_id === userInfo.id) {
            await this.setState({
                ...this.state,
                amIHost: true
            });
        }
    }
    editButtonPress = () => {
        this.setState({
            edit: !this.state.edit
        })
    };

    changeContents: any = (text: string): void => {
        this.setState({
            editText: text
        })
    }
    PressEidit = async () => {
        let body = {
            post_id: this.props.Room.id,
            text: this.state.editText
        }
        let token = await AsyncStorage.getItem("userToken");
        return EditRoom(body, `${token}`)
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }
                else {
                    Alert.alert("다시 시도해주세요")
                }
            })
            .then(resData => {
                if (resData) {
                    this.props.addRoom(resData);
                    return this.editButtonPress();
                }
            })
    }
    deleteButtonPress = async () => {
        let token = await AsyncStorage.getItem("userToken");
        return Alert.alert(
            "정말 삭제하시겠습니까?",
            "",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        DeleteRoom(this.props.Room.id, `${token}`)
                        return this.props.navigation.navigate("Board")
                    }
                }
            ]
        )
    };
    render() {
        return (
            <View>
                <View style={Styles.mainWrap}>
                    <TouchableOpacity
                        onPress={this.props.navigation.openDrawer}
                        style={Styles.sideBar}
                    />
                    <View style={Styles.contents}>
                        <View style={Styles.weatherBox}>
                            <Weather currWeather={this.state.weather} />
                        </View>
                        {this.state.edit ?
                            <Edit
                                editContent={this.changeContents}
                                contents={this.state.editText} />
                            : <ScrollView style={Styles.textBox}>
                                <Text>{this.props.Room.text}</Text>
                            </ScrollView>}
                        {this.state.amIHost ?
                            this.state.edit ?
                                <TouchableOpacity
                                    style={Styles.button}
                                    onPress={this.PressEidit}>
                                    <Text> 수정 완료!</Text>
                                </TouchableOpacity>
                                :
                                <View style={Styles.buttonBox}>
                                    <TouchableOpacity
                                        style={[Styles.button, { backgroundColor: "#ffffb1" }]}
                                        onPress={this.editButtonPress}
                                    >
                                        <Text> EDIT </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[Styles.button, { backgroundColor: "#ffb2b2" }]}
                                        onPress={this.deleteButtonPress}
                                    >
                                        <Text> DELETE </Text>
                                    </TouchableOpacity>
                                </View>
                            : null}
                    </View>
                </View>
                <View style={{ bottom: 0, position: "absolute" }}>
                    <AdBanner />
                </View>
            </View>
        );
    }
}
function mapStatesProps(state: any) {
    return {
        Room: state.room
    };
}
function dispatchState(dispatch: any) {
    return {
        addRoom: (room: RoomData): void => dispatch(roominfo(room))
    };
}

const Styles = StyleSheet.create({
    mainWrap: { flexDirection: "row", height: "100%" },
    sideBar: {
        width: "8%",
        height: "85%",
        backgroundColor: "#ffffff",
        elevation: 10,
        marginTop: 10,
        marginRight: 10
    },
    contents: {
        marginTop: 10,
        width: "85%",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        height: "85%",
        marginRight: 20,
        elevation: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    weatherBox: {
        backgroundColor: "#e5ffe5",
        borderRadius: 15,
        width: "95%",
        marginTop: 8,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8
    },
    textBox: {
        width: "95%",
        height: "100%",
        marginLeft: 8,
        marginRight: 8,
        backgroundColor: "#e5ffe5",
        borderRadius: 15,
        padding: 10,
        marginBottom: 8
    },
    buttonBox: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: 25,
        marginRight: 15,
        borderRadius: 5
    }
});

export default connect(mapStatesProps, dispatchState)(RoomInfo);