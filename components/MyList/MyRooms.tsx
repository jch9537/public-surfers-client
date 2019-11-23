import React, { Component } from 'react'
import { View, ScrollView } from "react-native";
import ListView from "../Board/BoardList";
import { fakeRoomList } from "../fakeData/board";
interface State {
    myRooms: Array<Posts>
}
interface Props {
    navigation: any
}
interface Posts {
    id: number,
    host_name: string,
    location_name: string,
    date: string,
}
export default class MyRooms extends Component<Props, State>{
    state = {
        myRooms: []
    }
    componentDidMount() {
        this.setState({
            myRooms: fakeRoomList
        })
        fetch("url/posts/userID")
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    this.setState({
                        myRooms: data
                    })
                }
            })
    }
    render() {
        return (
            <View>
                <View>
                    <ScrollView>
                        {this.state.myRooms.map(data => <ListView
                            key={data["id"]}
                            hostName={data["host_name"]}
                            Date={data["date"]}
                            local={data["location_name"]}
                            PostId={data["id"]}
                            navigation={this.props.navigation} />)}
                    </ScrollView>
                </View>
            </View>
        )
    }
}
