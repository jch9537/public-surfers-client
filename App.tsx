import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface AppProps {}

export interface AppState {}

class App extends React.Component<AppProps, AppState> {
    // state = { :  };
    render() {
        return (
            <View style={styles.container}>
                <Text>Starting ChiMe Client!!!</Text>
            </View>
        );
    }
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
