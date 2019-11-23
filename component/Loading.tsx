import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default class Loading extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})