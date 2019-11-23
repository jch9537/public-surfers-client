import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, ViewStyle, Alert } from 'react-native';

import Inputroom from './inputroom';

interface Style {
    room: ViewStyle;
}

class MakeRoom extends Component {
    // state = { :  }
    static navigationOptions = ({ navigation }: any) => {
        let headerTitle = 'MakeRoom';
        // let headerTitleStyle = { color: 'black' }; // 띄어쓰기 해야함
        let headerRight = (
            <Text onPress={() => Alert.alert('로그아웃')}>Logout</Text>
        );
        // let headerLeft = (
        //     <Icon name="home" onPress={() => navigation.navigate('Test1')} />
        // );

        return {
            headerTitle,
            // headerTitleStyle,
            headerRight
            // headerLeft
        };
    };
    render() {
        return (
            <View style={styles.room}>
                <Inputroom></Inputroom>
            </View>
        );
    }
}

export default MakeRoom;

const styles = StyleSheet.create<Style>({
    room: {
        flex: 1,
        backgroundColor: 'lightgrey'
    }
});
