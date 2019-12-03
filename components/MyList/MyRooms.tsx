import React, { Component } from 'react';
import { View, ScrollView, Text, Alert, AsyncStorage } from 'react-native';
import ListView from '../Board/BoardList';
import { fakeRoomList } from '../fakeData/board';
import { posts } from "../fetch";
interface State {
    myRooms: Array<Posts>;
}
interface Props {
    navigation: any;
}
interface Posts {
    id: number;
    host_name: string;
    location_name: string;
    date: string;
}
export default class MyRooms extends Component<Props, State> {
    state = {
        myRooms: []
    };
    async componentDidMount() {
        let token = await AsyncStorage.getItem("userToken")
        console.log("myroom token", token);
        await posts("GET", `${token}`, null, null, "my_list")
            .then(res => {
                console.log("MyRooms res", res);
                return res.json()
            })
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        myRooms: res
                    })
                }
            })
    }
    render() {
        return (
            <View>
                <View>
                    <ScrollView>
                        {this.state.myRooms.map(data => (
                            <ListView
                                key={data['id']}
                                hostName={data['host_name']}
                                Date={data['date']}
                                local={data['location_name']}
                                PostId={data['id']}
                                navigation={this.props.navigation}
                            />
                        ))}
                    </ScrollView>
                </View>
            </View>
        );
    }
}
