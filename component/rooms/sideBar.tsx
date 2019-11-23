import React, { Component } from 'react'
import { View, TouchableOpacity } from "react-native";
import { Text } from 'react-native-elements';
interface Props {
    navigation: any
}
interface State {
    Join: boolean | null
    User_id: number
}
export default class Drawer extends Component<Props, State> {
    state = {
        Join: null,
        User_id: 0
    };
    // componentDidMount() {
    //     // fetch("url/")
    //     //     .then(res => res.json())
    //     //     .then(data => {
    //     //         if (data.status === 200) {
    //     //             this.setState({
    //     //                 User_id: 
    //     //             })
    //     //         }
    //     //     })
    // }
    JoinChat = () => {
        this.setState({
            Join: !this.state.Join
        })
        //여기는 sideBar에서 참여하기 버튼을 누르면 생기는 일
        // fetch(`url/posts&room_id=${this.props.Room_id}`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     credentials: "include"
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.status === 200) {
        //             this.setState({
        //                 Join: !this.state.Join
        //             })
        //             this.props.navigation.navigate("Chat")
        //             //다시 refresh 하는게 어떨까??
        //         }
        //     })
    }
    getOut = () => {
        // console.log("?????")
        // fetch(`url/posts&room_id=${this.props.Room_id}`, {
        //     method: "DELETE",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     credentials: "include"
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.status === 204) {
        //             //여기서 삭제 되었다고 경고창 띄어주고  
        //             this.setState({
        //                 Join: !this.state.Join
        //             })
        //         }
        //     })
    }
    render() {
        return (
            <View>
                <Text>참여자 목록</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Chat")}>
                    <Text>참여자 채팅으로 이동</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.JoinChat}>
                    <Text>참여하기</Text>
                </TouchableOpacity>
                {this.state.Join ?
                    <TouchableOpacity onPress={this.getOut}>
                        <Text>방에서 나가기</Text>
                    </TouchableOpacity> : <View></View>}
            </View>
        )
    }
}
