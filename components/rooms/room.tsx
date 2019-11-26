import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from "react-native";
import { RoomData, roominfo } from "../src/redux/actions"
import { Text, Icon } from 'react-native-elements';
import { rooms } from "../fakeData/roomData";
import Weather from "./weather";
import { connect } from "react-redux";
interface Props {
    Room: RoomData
    addRoom(obj: RoomData): any
}
class RoomInfo extends Component<Props> {
    componentDidMount() {
        this.props.addRoom(rooms)
        // fetch(`url/post/${this.props.navigation.getParam("PostId")}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         
        //     })

    }
    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.topScreen}>
                    <Icon
                        type="material"
                        size={50}
                        name="accessibility"
                    ></Icon>
                    <View style={styles.weatherView}>
                        <Weather />
                    </View>
                    <Text style={styles.textSize}> {this.props.Room.host_name} {this.props.Room.location_name} {this.props.Room.date}</Text>
                </View>
                <View style={styles.bodyScreen}>
                    <ScrollView>
                        <Text>{this.props.Room.text}</Text>
                    </ScrollView>
                </View>
                <View style={styles.lowScreen}>
                    <Text></Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    weatherView: {
        flex: 1.5,
        width: 300,
        height: 30,
        backgroundColor: "yellow"
    },
    textSize: {
        fontSize: 20
    },
    topScreen: {
        flex: 4,
        backgroundColor: "red"
    },
    bodyScreen: {
        flex: 10,
        backgroundColor: "blue"
    },
    lowScreen: {
        flex: 3,
        backgroundColor: "green"
    }
})
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
export default connect(mapStatesProps, dispatchState)(RoomInfo);