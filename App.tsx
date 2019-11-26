import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';

import * as firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig';
import ChatRoom from './components/Chat/chat';
import Main from './components/Main';
import MakeRoom from './components/makerooms/makeroom';
import Room from './components/rooms/room';
import SignPage from './components/Sign';
import Board from './components/Board/Board';
import SideBar from './components/rooms/sideBar';
import MyRoomList from './components/MyList/MyRooms';
import Setting from './components/setinfo/setting';

firebase.initializeApp(firebaseConfig);
const DrawSide = createDrawerNavigator(
    {
        RoomScress: { screen: Room }
    },
    {
        contentComponent: props => <SideBar navigation={props.navigation} />
    }
);

const BoardStack = createStackNavigator({
    Main: { screen: Main },
    Board: { screen: Board },
    MyRoomList: { screen: MyRoomList },
    Chat: { screen: ChatRoom },
    Room: { screen: DrawSide },
    MakeRoom: { screen: MakeRoom },
    Setting: { screen: Setting }
});
const MainTab = createBottomTabNavigator({
    Surf: {
        screen: BoardStack,
        navigationOptions: {
            tabBarIcon: () => <Icon name="home" size={29}></Icon>
        }
    },
    Info: {
        screen: Setting,
        navigationOptions: {
            tabBarIcon: () => <Icon name="face" size={29}></Icon>
        }
    }
});

const SignMainSwitch = createSwitchNavigator(
    {
        MainPart: { screen: MainTab },
        SignPart: { screen: SignPage }
    },
    {
        initialRouteName: 'SignPart'
    }
);

const AppContainer = createAppContainer(SignMainSwitch);

export default class App extends Component {
    render() {
        return <AppContainer />;
    }
}
