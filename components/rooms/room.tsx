import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { RoomData, roominfo } from "../src/redux/actions"
import { Text, Button } from 'react-native-elements';
import { rooms } from "../fakeData/roomData";
import Weather from "./weather";
import { connect } from "react-redux";
import { post } from "../fetch";
import Logout from '../utils/logout';
import AdBanner from "../AdBanner";
interface Props {
    Room: RoomData
    navigation: any
    addRoom(obj: RoomData): any
}
class RoomInfo extends Component<Props> {
    componentDidMount() {
        this.props.addRoom(rooms)
        // fetch(`url/post/${this.props.navigation.getParam("PostId")}`)
        //     .then(res => res.json())
        //     .then(data => {})
    }
    editButtonPress = () => {
        //edit페이지로 이동
    }
    deleteButtonPress = () => {
        console.log("????");
        // return await post("DELETE", null, this.props.Room.id);
    }
    render() {
        return (
            <View >
                <View style={{ flexDirection: "row", height: "100%" }}>
                    <TouchableOpacity
                        onPress={this.props.navigation.openDrawer}
                        style={styles.sideBar} >
                    </TouchableOpacity>
                    <View style={styles.contents}>
                        <View style={{ width: "100%", height: 60, backgroundColor: "yellow" }}>
                            <Weather />
                        </View>
                        <ScrollView
                            style={styles.text}>
                            <Text style={{ fontSize: 15 }}>{this.props.Room.text}</Text>
                        </ScrollView >
                        <View style={{ flexDirection: "row", justifyContent: 'flex-end', marginRight: 14 }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this.editButtonPress}>
                                <Text> EDIT </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this.deleteButtonPress}>
                                <Text> DELETE </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >
                <View style={{ bottom: 0, position: "absolute" }}>
                    <AdBanner />
                </View>
            </View >
        )
    }
}
function mapStatesProps(state: any) {
    return {
        Room: state.room
    }
}
function dispatchState(dispatch: any) {
    return {
        addRoom: (room: RoomData): void => dispatch(roominfo(room))
    }
}
const styles = StyleSheet.create({
    sideBar: {
        width: "8%",
        height: "85%",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 16,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 10,
        marginTop: 10,
        marginRight: 10
    },

    room: {
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 25,
        margin: 10,
        backgroundColor: "white"
    },
    contents: {
        marginTop: 10,
        width: "85%",
        flexDirection: "column",
        backgroundColor: "white",
        height: "85%",
        marginRight: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 300,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 10,
    },
    text: {
        width: "100%",
        height: "100%"

    }
})
export default connect(mapStatesProps, dispatchState)(RoomInfo);