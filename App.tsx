
import React, { Component } from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack"
import { createDrawerNavigator } from "react-navigation-drawer";
import { RoomInfo } from "./components/src/redux/reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import ChatRoom from "./components/Chat/chat";
import Main from "./components/Main";
import MakeRoom from "./components/makerooms/makeroom";
import Room from "./components/rooms/room";
import SignPage from "./components/Sign";
import Board from './components/Board/Board';
import SideBar from "./components/rooms/sideBar";
import * as firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig";
import MyRoomList from "./components/MyList/MyRooms";

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
    Room: { screen: DrawSide },
    MakeRoom: { screen: MakeRoom }
    //makeRoom: {screen : MakeRoom},
    // MyRoomList : {screen : MyRoomList}
})

const SignMainSwitch = createSwitchNavigator({
    MainPart: { screen: BoardStack },
    SignPart: { screen: SignPage }
}, {
        initialRouteName: 'SignPart',
    })

const AppContainer = createAppContainer(SignMainSwitch)
const store = createStore(RoomInfo);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        )
    }
};