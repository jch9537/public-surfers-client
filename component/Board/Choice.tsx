import React, { Component } from 'react'
import {
    View, Picker
} from "react-native";

interface Props {
    board: Array<Posts>;
    func: any
}
interface Posts {
    id: number,
    host_name: string,
    location_name: string,
    date: string,
}
export default class Choice extends Component<Props, {}> {
    render() {
        return (
            <View>
                <Picker onValueChange={(itemValue) => this.props.func(itemValue, "location_name")}>
                    {this.props.board.map(data => <Picker.Item key={data["id"]} label={data["location_name"]} value={data["location_name"]}></Picker.Item>)}
                </Picker>
                <Picker onValueChange={(itemValue) => this.props.func(itemValue, "date")}>
                    {this.props.board.map(data => <Picker.Item key={data["id"]} label={data["date"]} value={data["date"]}></Picker.Item>)}
                </Picker>
            </View>
        )
    }
}
