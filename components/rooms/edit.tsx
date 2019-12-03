import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { EditRoom } from "../fetch";
interface Props {
    contents: string
    editContent: any
}
interface State {
    text: string
}
export default class Edit extends Component<Props, State> {

    render() {
        return (
            <View style={{ alignItems: "center" }}>
                <TextInput
                    style={style.textInput}
                    onChangeText={this.props.editContent}
                    value={this.props.contents}
                />
            </View>
        )
    }
}
const style = StyleSheet.create({
    textInput: {
        width: 300,
        height: 330,
        marginLeft: 8,
        marginRight: 8,
        backgroundColor: "#e5ffe5",
        borderRadius: 15,
        padding: 10,
        marginBottom: 8
    }
})
