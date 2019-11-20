import React, { Component } from 'react'
import { View } from "react-native";
import { Text } from 'react-native-elements';
import { rooms } from "../fakeData/roomData";
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
    state = ({
        id: 0,
        host_id: 0,
        host_name: "",
        location_name: "",
        date: "",
        text: "",
        participants: []

    })
    componentDidMount() {
        if (rooms["id"] === this.props.navigation.getParam("PostId")) {
            this.setState({
                id: rooms["id"],
                host_id: rooms["host_id"],
                host_name: rooms["host_name"],
                location_name: rooms["location_name"],
                date: rooms["date"],
                text: rooms["text"],
                participants: room["participants"]
            })
        }

        // fetch(`url/post/${this.props.navigation.getParam("PostId")}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         //     this.setState({
        //         //         host: data["n"]
        //         // })
        //     })

    }
    render() {
        return (
            <View>
                <Text>
                    {this.state.host_name}
                </Text>
                <Text>
                    {this.state.date}
                </Text>
                <Text>
                    {this.state.text}
                </Text>
            </View>
        )
    }
}
