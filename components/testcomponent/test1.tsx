import * as React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

export interface Test1Props {}
export interface Test1State {}

class Test1 extends React.Component<Test1Props, Test1State> {
    // state = { :  }
    static navigationOptions = ({ navigation }: any) => {
        let headerTitle = 'Home';
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
            <View style={styles.test}>
                <Text>MainPage (Test1)</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    test: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgrey'
    }
});

export default Test1;
