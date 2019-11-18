import React, { Component } from 'react';
import { View, Text, Button } from "react-native";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

export default class Main extends Component {
    render() {

        return (
            <View>
                <Text>방만들기</Text>
                <Text>참여하기</Text>
                <Text>my room</Text>
            </View>
        )
    }
}
