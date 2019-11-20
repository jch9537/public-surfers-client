import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import SignPage from "./signPage/signPage"

export default class App extends React.Component {
    static navigationOptions = { header: null };

    render() {
        return (
            <View >
                <View style={{ padding: 10 }}>
                    <KeyboardAvoidingView behavior="position" style={styles.form}>
                        <SignPage />
                    </KeyboardAvoidingView>
                </View >
            </View >
        );
    }
}
const styles = StyleSheet.create({
    form: {
        height: "90%"
    }
})