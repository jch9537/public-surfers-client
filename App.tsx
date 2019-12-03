import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { Icon } from "react-native-elements";
import { Feather, FontAwesome, Ionicons } from "react-native-vector-icons";
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
        <View style={styles.container}>
          <Image
            source={require("./assets/images/logout.png")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
          <Text style={{ marginRight: 10 }} onPress={() => Logout(navigation)}>
            Logout
          </Text>
        </View>
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
        <View style={styles.container}>
          <Image
            source={require("./assets/images/logout.png")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
          <Text style={{ marginRight: 10 }} onPress={() => Logout(navigation)}>
            Logout
          </Text>
        </View>
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
        <View style={styles.container}>
          <Image
            source={require("./assets/images/logout.png")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
          <Text style={{ marginRight: 10 }} onPress={() => Logout(navigation)}>
            Logout
          </Text>
        </View>
      );

      return {
        headerTitle,
        headerRight
      };
    }
  },
  Chat: {
    screen: ChatRoom,
    navigationOptions: ({ navigation }: any) => {
      let headerTitle = "Chat";
      let headerRight = (
        <View style={styles.container}>
          <Image
            source={require("./assets/images/logout.png")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
          <Text style={{ marginRight: 10 }} onPress={() => Logout(navigation)}>
            Logout
          </Text>
        </View>
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
        <View style={styles.container}>
          <Image
            source={require("./assets/images/logout.png")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
          <Text style={{ marginRight: 10 }} onPress={() => Logout(navigation)}>
            Logout
          </Text>
        </View>
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
        <View style={styles.container}>
          <Image
            source={require("./assets/images/logout.png")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
          <Text style={{ marginRight: 10 }} onPress={() => Logout(navigation)}>
            Logout
          </Text>
        </View>
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
        <View style={styles.container}>
          <Image
            source={require("./assets/images/logout.png")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
          <Text style={{ marginRight: 10 }} onPress={() => Logout(navigation)}>
            Logout
          </Text>
        </View>
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
      tabBarIcon: () => <Ionicons name="ios-analytics" size={30}></Ionicons>
    }
  },
  User: {
    screen: Setting,
    navigationOptions: {
      tabBarIcon: () => <FontAwesome name="grav" size={26}></FontAwesome>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 30,
    height: 30,
    margin: 5
  }
});
