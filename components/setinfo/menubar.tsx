import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';

// export interface MenuBarProps {}

// export interface MenuBarState {}

class MenuBar extends Component {
    // state = { :  }
    render() {
        return (
            <View>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{
                        text: 'SURFERS PARADISE',
                        style: { color: '#fff' }
                    }}
                    rightComponent={{ icon: 'face', color: '#fff' }}
                />
            </View>
        );
    }
}

export default MenuBar;
