import React from 'react';
import { AppRegistry } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';

// import Main from "./component/Board/Main";
// import SignPage from "./component/Sign";
// import Board from './component/Board/Board';
// import Room from "./component/rooms/room";
import Setting from './components/setinfo/setting';
import MakeRoom from './components/makerooms/makeroom';
import Test1 from './components/testcomponent/test1';
import Test2 from './components/testcomponent/test2';
// import Test3 from './components/testcomponent/test3';

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: createStackNavigator({
            Home: { screen: Test1 }
        }),
        navigationOptions: {
            tabBarIcon: () => <Icon name="home" size={29}></Icon>
        }
    },
    Board: {
        screen: createStackNavigator({
            Board: { screen: Test2 }
        }),
        navigationOptions: {
            tabBarIcon: () => <Icon name="storage" size={29}></Icon>
        }
    },
    MakeRoom: {
        screen: createStackNavigator({
            MakeRoom: { screen: MakeRoom }
        }),
        navigationOptions: {
            tabBarIcon: () => <Icon name="add" size={29}></Icon>
        }
    },
    Setting: {
        screen: createStackNavigator({
            Setting: { screen: Setting }
        }),
        navigationOptions: {
            tabBarIcon: () => <Icon name="face" size={29}></Icon>
            //아이콘 build중 선택
        }
    }
});
const AppContainer = createAppContainer(TabNavigator);

const App = () => {
    return <AppContainer />;
};

export default App;

AppRegistry.registerComponent('chiMe', () => App);
