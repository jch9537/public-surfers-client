import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { RoomData, roominfo } from "../src/redux/actions"
import { Text, Button } from 'react-native-elements';
import { rooms } from "../fakeData/roomData";
import Weather from "./weather";
import { connect } from "react-redux";
import { post } from "../fetch";
import * as Constants from 'expo';

interface Props {
    Room: RoomData
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
    deleteButtonPress = async () => {
        console.log("????");
        return await post("DELETE", null, this.props.Room.id);
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ width: "100%", height: 60, backgroundColor: "yellow" }}>
                    <Weather />
                </View>
                <ScrollView
                    style={styles.contents}
                    pagingEnabled={true}
                    contentContainerStyle={{}}>
                    <Text style={styles.text}>{this.props.Room.text}</Text>
                    <Text style={{ marginBottom: 1000 }}></Text>
                </ScrollView >
                <View style={{ flexDirection: "row" }}>
                    <Button title="EDIT" onPress={this.editButtonPress} />
                    <Button title="DELETE" onPress={this.deleteButtonPress} />
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
    room: {
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
    },
    contents: {
        width: "100%",
        marginBottom: 6,
        backgroundColor: "green"
    },
    text: {
        fontSize: 18
    }
})
export default connect(mapStatesProps, dispatchState)(RoomInfo);