import React, { Component } from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Button } from "react-native-elements"
import SignIn from "./signInPage";
import SignUp from "./signupPage";

interface Style {
    button: ViewStyle,
    container: ViewStyle
}
export default class signpage extends Component {
    state = {
        togglePage: false,
    }
    changeToggle = () => {
        this.setState({
            togglePage: !this.state.togglePage
        })
    }
    render() {
        return (
            <View >
                <View style={styles.button}>
                    <Button
                        onPress={this.changeToggle}
                        title={this.state.togglePage ? "로그인 하러가기" : "회원가입 하기!"}>
                    </Button>
                </View>
                <View style={styles.container}>
                    {this.state.togglePage ? <SignUp></SignUp> : <SignIn></SignIn>}
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create<Style>({
    button: {
        height: "80%",
        justifyContent: 'center'
    },
    container: {
        height: "3%"
    }
})
