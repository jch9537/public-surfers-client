import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
// import SignPage from "./component/signPage/signPage";
import Main from "./component/Board/Main";

class App extends React.Component {

    render() {
        return (
            <View >
                <View style={{ padding: 10 }}>
                    <Main></Main>
                    <KeyboardAvoidingView behavior="position" style={styles.form}>
                        {/* <SignPage /> */}
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

export default App;

