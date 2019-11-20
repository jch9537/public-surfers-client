import React from 'react';
import { AppRegistry, StyleSheet, Text, View, ViewStyle } from 'react-native';

import Setting from './components/setinfo/setting';
import MakeRoom from './components/makerooms/makeroom';

interface appContainer {
    container: ViewStyle;
}
export interface AppProps {}

export interface AppState {}

class App extends React.Component<AppProps, AppState> {
    // state = { :  };
    render() {
        return (
            <View style={styles.container}>
                <Setting></Setting>
                {/* <MakeRoom></MakeRoom> */}
            </View>
        );
    }
}

export default App;

const styles = StyleSheet.create<appContainer>({
    container: {
        flex: 1
    }
});

AppRegistry.registerComponent('chiMe', () => App);
