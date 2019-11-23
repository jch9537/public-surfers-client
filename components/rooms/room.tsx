import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from "react-native";
import { DrawerActions } from "react-navigation-drawer";
import { Text, Icon } from 'react-native-elements';
import { rooms } from "../fakeData/roomData";
import Weather from "./weather";

interface Props {
    navigation: any
}
interface State {
    id?: number
    host_id?: number
    host_name?: string
    location_name?: string
    date?: string
    text: string
    participants?: Array<string>
}

export default class room extends Component<Props, State> {
    state = {
        id: 0,
        host_id: 0,
        host_name: "",
        location_name: "",
        date: "",
        text: "",
        participants: []
    }
    componentDidMount() {
        this.setState({
            id: rooms["id"],
            host_id: rooms["host_id"],
            host_name: rooms["host_name"],
            location_name: rooms["location_name"],
            date: rooms["date"],
            text: rooms["text"],
            participants: rooms["participants"]
        })

        // fetch(`url/post/${this.props.navigation.getParam("PostId")}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         //     this.setState({
        //         //         host: data["n"]
        //         // })
        //     })

    }
    render() {
        console.log("???????");
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
                    <Text style={styles.textSize}> {this.state.host_name} {this.state.date} {this.state.location_name}</Text>
                </View>
                <View style={styles.bodyScreen}>
                    <ScrollView>
                        <Text>{this.state.text}</Text>
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