import React, { Component } from "react";
import { Text } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { Icon } from "react-native-elements";
import * as firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig";
import { RoomInfo } from "./components/src/redux/reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";

import ChatRoom from "./components/chatScreen";
import Main from "./components/Main";
import MakeRoom from "./components/makerooms/makeroom";
import Room from "./components/rooms/room";
import SignPage from "./components/Sign";
import Board from "./components/Board/Board";
import SideBar from "./components/rooms/sideBar";
import MyRoomList from "./components/MyList/MyRooms";
import Setting from "./components/setinfo/setting";
import Loading from "./components/Loading";
import Logout from "./components/utils/logout";
import ChatScreen from "./components/chatScreen";

firebase.initializeApp(firebaseConfig);
const DrawSide = createDrawerNavigator(
  {
    RoomScreen: { screen: Room }
  },
  {
    contentComponent: (props: any) => <SideBar navigation={props.navigation} />
  }
);
const BoardStack = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: ({ navigation }: any) => {
      let headerTitle = "Main";
      let headerRight = (
        <Text style={{ marginRight: 10 }} onPress={() => Logout(navigation)}>
          Logout
        </Text>
      );

      return {
        headerTitle,
        headerRight
      };
    }
  },
  Board: {
    screen: Board,
    navigationOptions: ({ navigation }: any) => {
      let headerTitle = "Board";
      let headerRight = (
        <Text style={{ marginRight: 10 }} onPress={() => Logout(navigation)}>
          Logout
        </Text>
      );

      return {
        headerTitle,
        headerRight
      };
    }
  },
  MyRoomList: {
    screen: MyRoomList,
    navigationOptions: ({ navigation }: any) => {
      let headerTitle = "MyRooms";
      let headerRight = (
        <Text style={{ marginRight: 10 }} onPress={() => Logout(navigation)}>
          Logout
        </Text>
      );

      return {
        headerTitle,
        headerRight
      };
    }
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: ({ navigation }: any) => {
      let headerTitle = "Chat";
      let headerRight = (
        <Text style={{ marginRight: 10 }} onPress={() => Logout(navigation)}>
          Logout
        </Text>
      );

      return {
        headerTitle,
        headerRight
      };
    }
  },
  Room: {
    screen: DrawSide,
    navigationOptions: ({ navigation }: any) => {
      let headerTitle = "Room";
      let headerRight = (
        <Text style={{ marginRight: 10 }} onPress={() => Logout(navigation)}>
          Logout
        </Text>
      );

      return {
        headerTitle,
        headerRight
      };
    }
  },
  MakeRoom: {
    screen: MakeRoom,
    navigationOptions: ({ navigation }: any) => {
      let headerTitle = "MakeRoom";
      let headerRight = (
        <Text style={{ marginRight: 10 }} onPress={() => Logout(navigation)}>
          Logout
        </Text>
      );

      return {
        headerTitle,
        headerRight
      };
    }
  },
  Setting: {
    screen: Setting,
    navigationOptions: ({ navigation }: any) => {
      let headerTitle = "Setting";
      let headerRight = (
        <Text style={{ marginRight: 10 }} onPress={() => Logout(navigation)}>
          Logout
        </Text>
      );

      return {
        headerTitle,
        headerRight
      };
    }
  }
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
    SignPart: { screen: SignPage },
    LoadingPart: { screen: Loading }
  },
  {
    initialRouteName: "LoadingPart"
  }
);
const AppContainer = createAppContainer(SignMainSwitch);
const store = createStore(RoomInfo);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
