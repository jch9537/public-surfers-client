import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Icon } from "react-native-elements";
import * as Google from "expo-google-app-auth";
import { ClientId } from "./MyID";
interface Props {
    navigation: any
}
export default class google extends Component<Props> {
    signInGoogle = async () => {
        try {
            const result = await Google.logInAsync({
                clientId: ClientId
            });
            if (result.type === "success") {
                const { email, givenName } = result.user
                this.props.navigation.navigate("Main");
                console.log(result);

                // console.log(email, givenName);
                // fetch("url", {
                //     method: "POST",
                //     headers: {
                //         "Content-type": "application/json"
                //     },
                //     body: JSON.stringify({ email, name: givenName, Auth: 1 }),
                //     credentials: "include"
                // })
                //     .then(res => res.json())
                //     .then(data => {
                //         if (data.status === 201) {
                //             this.setState({

                //             })
                //             this.props.navigation.navigate("Main");
                //         }
                //     })
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.signInGoogle} >
                    <View>
                        <Icon
                            name='google'
                            type="antdesign"
                            size={50}
                            color='black'
                        />
                        <Text style={styles.text}>구글 로그인 하기</Text>
                    </View>
                </TouchableOpacity>
            </View >
        )
    }
}
const styles = StyleSheet.create({
    button: {
        flex: 1,
        padding: 70
    },
    text: {
        padding: 20,
        height: 60,
        alignItems: "center"
    }
})