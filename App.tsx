import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack"
import Main from "./component/Board/Main";
import SignPage from "./component/Sign";
import Board from './component/Board/Board';
import Room from "./component/rooms/room";
const AppNavigator = createStackNavigator({
    SignPart: { screen: SignPage },
    Main: { screen: Main },
    Board: { screen: Board },
    Room: { screen: Room }
}, {
        initialRouteName: "Main"
    })
const AppContainer = createAppContainer(AppNavigator)

export default AppContainer;

