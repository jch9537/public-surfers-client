import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { EditRoom } from "../fetch";
interface Props {
    contents: string
    postId: number
    editState(): void
}
interface State {
    text: string
}
export default class Edit extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            text: this.props.contents
        }
        this.changeContents = this.changeContents.bind(this);
        this.eidit = this.eidit.bind(this);
    }
    changeContents(text: string) {
        this.setState({
            text: text
        })
    }
    eidit() {
        let body = {
            post_id: this.props.postId,
            text: this.state.text
        }
        return EditRoom(body)
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
                    return this.props.editState();
                }
            })
    }
    render() {
        return (
            <View>
                <TextInput
                    style={style.textInput}
                    onChangeText={this.changeContents}
                    value={this.state.text}
                />
                <TouchableOpacity onPress={this.eidit}
                >
                    <Text>
                        수정완료
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const style = StyleSheet.create({
    textInput: {
        width: "95%",
        height: "100%",
        marginLeft: 8,
        marginRight: 8,
        backgroundColor: "#e5ffe5",
        borderRadius: 15,
        padding: 10,
        marginBottom: 8
    }
})