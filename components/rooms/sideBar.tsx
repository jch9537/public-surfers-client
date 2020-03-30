import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    AsyncStorage,
    Image,
    Alert
} from "react-native";
import { RoomData } from "../src/redux/actions";
import { Text } from "react-native-elements";
import { connect } from "react-redux";
import {
    JoinChatfromSideBar,
    identifyUser,
    participateRoom
} from "../fetch";

interface Props {
    navigation: any;
    Room: RoomData;
}

interface State {
    participants: string[]
    amIHost: boolean
    amIParticipant: boolean;
}

class SideBar extends Component<Props, State> {
    state: State = {
        participants: [],
        amIHost: false,
        amIParticipant: false
    };

    async componentDidMount() {
        let token = await AsyncStorage.getItem("userToken");
        let userData = await identifyUser(token);
        let participants = this.props.Room.participants;
        if (this.props.Room.host_name === userData.name) {
            console.log("this.", this.props.Room.host_name)
            this.setState({
                amIHost: true
            })
        }
        this.setState({
            participants: participants
        })
        if (participants.includes(userData.name)) {
            this.setState({
                ...this.state,
                amIParticipant: true
            });
        }
    }
    //채팅창 입장
    joinChat = async () => {
        return this.props.navigation.navigate("Chat");
    };

    //방에 참여
    joinRoom = async () => {
        let token = await AsyncStorage.getItem("userToken");
        await participateRoom(token, this.props.Room.id);
        let userData = await identifyUser(token);
        let JoinRooms = this.state.participants.concat([userData.name])
        this.setState({
            ...this.state,
            participants: JoinRooms,
            amIParticipant: true
        });
    };

    //방에서 나가기
    getOut = async () => {
        let token = await AsyncStorage.getItem("userToken");
        let userData = await identifyUser(token);
        let deleteJoin = [this.props.Room.host_name];
        if (this.state.amIHost) {
            Alert.alert("주인은 나갈 수 없습니다.")
        } else {
            for (let i = 0; i < this.state.participants.length; i++) {
                if (this.state.participants[i] !== userData.name) {
                    deleteJoin.push(this.state.participants[i])
                }
            }
        }
        this.setState({
            participants: deleteJoin
        })
        return JoinChatfromSideBar(`${token}`, this.props.Room.id)
            .then(res => res.json())
            .then(res => {
                if (res) {
                    this.setState({
                        ...this.state,
                        amIParticipant: false
                    });
                }
            });
        // await 
    };

    render() {
        return (
            <View style={Styles.wrap}>
                <View style={Styles.head}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Image
                            source={{ uri: "https://www.clipartwiki.com/clipimg/detail/31-312536_surf-icon-illustration.png" }}
                            style={Styles.host_image}
                        />
                        <Text style={Styles.host_name}>{this.props.Room.host_name}</Text>
                    </View>
                </View>
                <Text style={Styles.title}>참여자 목록</Text>
                <ScrollView>
                    {this.state.participants.map((data, index) => (
                        <Text key={index} style={Styles.contents}>
                            {data}
                        </Text>
                    ))}
                </ScrollView>
                {this.state.amIParticipant ? (
                    <View style={Styles.buttonWrap}>
                        <TouchableOpacity style={Styles.button} onPress={this.joinChat}>
                            <Text style={Styles.activated}>채팅방 들어가기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.button} onPress={this.getOut}>
                            <Text style={Styles.activated}>모임에서 나가기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.button}>
                            <Text style={Styles.unactivated}>모임에 참여하기</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                        <View style={Styles.buttonWrap}>
                            <TouchableOpacity style={Styles.button}>
                                <Text style={Styles.unactivated}>채팅방 들어가기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.button}>
                                <Text style={Styles.unactivated}>모임에서 나가기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.button} onPress={this.joinRoom}>
                                <Text style={Styles.activated}>모임에 참여하기</Text>
                            </TouchableOpacity>
                        </View>
                    )}
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    head: {
        height: 100,
        backgroundColor: "#d3d3d3",
        justifyContent: "center",
        alignContent: "center",
        paddingTop: 60,
        paddingBottom: 50,
        flexDirection: "column",
        width: "100%"
    },
    host_name: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 7
    },
    host_image: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    title: {
        fontSize: 20,
        marginTop: 30,
        marginBottom: 20
    },
    contents: {
        fontSize: 15,
        marginBottom: 5
    },
    activated: {},
    unactivated: { opacity: 0.2 },
    buttonWrap: { width: "100%" },
    button: {
        padding: 10,
        borderTopWidth: 0.5,
        height: 40,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
});

function mapStatesProps(state: any) {
    return {
        Room: state.room,
        join: state.Join
    };
}

function dispatchState(dispatch: any) {
    return {
        JoinChat: (): void => dispatch(joinChat())
    };
}

export default connect(mapStatesProps, dispatchState)(SideBar);
