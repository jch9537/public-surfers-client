import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import SignPage from "./signPage/signPage"
import Google from "./signPage/google";

interface Props {
    navigation: any
}

export default class App extends React.Component<Props> {
    static navigationOptions = { header: Google };

    render() {
        return (
            <View style={{
                flex: 1, justifyContent: "center", alignItems: "center"
            }}>
                <View style={{ padding: 10, }}>
                    <KeyboardAvoidingView behavior="position" style={styles.form}>
                        <Google navigation={this.props.navigation} />
                        <SignPage></SignPage>
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