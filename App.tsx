
import React, { Component } from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack"
import { createDrawerNavigator } from "react-navigation-drawer";
import ChatRoom from "./component/Chat/chat";
import Main from "./component/Board/Main";
import Room from "./component/rooms/room";
import SignPage from "./component/Sign";
import Board from './component/Board/Board';
import SideBar from "./component/rooms/sideBar";
import * as firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig";
import MyRoomList from "./component/MyList/MyRooms";

firebase.initializeApp(firebaseConfig);
const DrawSide = createDrawerNavigator({
    RoomScress: { screen: Room }
}, {
        contentComponent: props => <SideBar navigation={props.navigation} />
    }
)
const BoardStack = createStackNavigator({
    Main: { screen: Main },
    Board: { screen: Board },
    MyRoomList: { screen: MyRoomList },
    Chat: { screen: ChatRoom },
    Room: { screen: DrawSide }
    //makeRoom: {screen : MakeRoom},
    // MyRoomList : {screen : MyRoomList}
})

const SignMainSwitch = createSwitchNavigator({
    MainPart: { screen: BoardStack },
    SignPart: { screen: SignPage }
}, {
        initialRouteName: 'MainPart',
    })

const AppContainer = createAppContainer(SignMainSwitch)


export default class App extends Component {
    render() {
        return (
            <AppContainer />
        )
    }
};