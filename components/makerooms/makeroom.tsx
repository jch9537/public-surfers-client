import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

import Inputroom from './inputroom';

// export interface MakeRoomProps {}
// export interface MakeRoomState {}  둘 다 필요 없어보임

interface Style {
    room: ViewStyle;
}

class MakeRoom extends Component {
    // state = { :  }
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
        backgroundColor: 'blue'
        // justifyContent: 'center',
        // alignItems: 'center'
    }
});
