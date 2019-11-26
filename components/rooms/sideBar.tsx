import React, { Component } from 'react'
import { View, TouchableOpacity, ScrollView } from "react-native";
import { RoomData, joinChat } from "../src/redux/actions"
import { Text } from 'react-native-elements';
import { connect } from "react-redux";
interface Props {
    navigation: any
    Room: RoomData
    join: boolean
    JoinChat(): any
}
class SideBar extends Component<Props> {
    componentDidMount() {
        // fetch("url/posts")
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.status === 200) {
        //         }
        //     })
    }
    joinChat = () => {
        this.props.JoinChat()
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
        console.log(this.props.JoinChat)
        console.log(this.props.join);
        return (
            <View>
                <Text>참여자 목록</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Chat")}>
                    <Text>참여자 채팅으로 이동</Text>
                </TouchableOpacity>
                <ScrollView>
                    {this.props.Room.participants.map((data, index) => < Text key={index} > {data}</Text>)}
                </ScrollView>
                <TouchableOpacity onPress={this.joinChat}>
                    <Text>음....test중입니다.</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
function mapStatesProps(state: any) {
    console.log("STate", state)
    return {
        Room: state.room,
        join: state.Join
    }
}
function dispatchState(dispatch: any) {
    return {
        JoinChat: (): void => dispatch(joinChat())
    }
}
export default connect(mapStatesProps, dispatchState)(SideBar);