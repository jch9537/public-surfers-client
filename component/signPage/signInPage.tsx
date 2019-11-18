import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { Input, Icon } from "react-native-elements";

interface State {
    email: string
    password: string
    errorMsg: Boolean
    siginin: boolean
}

export default class sigininpage extends Component<{}, State>{
    state = {
        email: "",
        password: "",
        errorMsg: true,
        siginin: false
    }
    SignIn = () => {
        const { email, password } = this.state
        if (!this.state.errorMsg) {
            console.log("확인중")
            fetch("url//user/signin", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            })
                .then(res => res.json())
                .then(resData => {
                    if (resData.status === 200) {
                        this.setState({
                            siginin: !this.state.siginin
                        })
                    }
                })
        }
    }

    ChangeState = (value: string, key: any) => {
        if (value.length > 0) {
            const obj = { [key]: value } as Pick<State, keyof State>
            obj["errorMsg"] = false
            this.setState(obj)
        } else {
            this.setState({
                errorMsg: !this.state.errorMsg
            })
        }
    }

    render() {
        return (
            <View>
                <Input
                    placeholder=' xxx@email.com'
                    onChangeText={(text) => this.ChangeState(text, "email")}
                    errorMessage={this.state.errorMsg ? "error" : ""}
                    keyboardType="email-address"
                    leftIcon={
                        <Icon
                            name='idcard'
                            type="antdesign"
                            size={18}
                            color='black'
                        />
                    }
                />
                <Input
                    placeholder=' @@@@@@@@'
                    onChangeText={(text) => this.ChangeState(text, "password")}
                    secureTextEntry={true}
                    errorMessage={this.state.errorMsg ? "error" : ""}
                    leftIcon={
                        <Icon
                            name='key'
                            type="antdesign"
                            size={18}
                            color='black'
                        />}
                />
                <View>
                    <Button onPress={this.SignIn}
                        title="login"></Button>
                </View>
            </View>
        )
    }

}
