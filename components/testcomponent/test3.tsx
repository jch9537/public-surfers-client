import * as React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

export interface Test3Props {}
export interface Test3State {}

class Test3 extends React.Component<Test3Props, Test3State> {
    // state = { :  }
    static navigationOptions = {
        headerTitle: () => <Text>hi</Text>,
        headerRight: () => (
            <Button
                onPress={() => Alert.alert('This is a button!')}
                title="Info"
                color="#fff"
            />
        )
    };
    render() {
        return (
            <View style={styles.test}>
                <Text>테스트3 (LogOut : Header)</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    test: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Test3;
