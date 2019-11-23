import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { Input, Icon } from "react-native-elements";
export interface State {
    name: string;
    email: string;
    password: string;
    siginup: boolean;
    phone: string
    error: boolean
}
export default class sigininpage extends Component<{}, State> {
    state = {
        name: "",
        email: "",
        password: "",
        phone: "",
        siginup: false,
        error: true
    }
    ChangeState = (value: string, key: any) => {
        if (value.length > 0) {
            const obj = { [key]: value } as Pick<State, keyof State>
            obj["error"] = false
            this.setState(obj)
        } else {
            this.setState({
                error: true
            })
        }
    }
    fetchSignUp = () => {
        const { email, password, name, phone } = this.state
        if (!this.state.error) {
            console.log("확인중")
            fetch("url//user/signin", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, phone }),
                credentials: "include"
            })
                .then(res => res.json())
                .then(resData => {
                    if (resData.status === 200) {
                        this.setState({
                            siginup: !this.state.siginup
                        })
                    }
                })
        }
        //fetch 요청
    }
    render() {
        return (
            <View>
                <View>
                    <Input
                        placeholder=' 아무개'
                        onChangeText={(text: string) => this.ChangeState(text, "name")}
                        leftIcon={
                            <Icon
                                name='user'
                                type="antdesign"
                                size={18}
                                color='black'
                            />}
                    />
                    <Input
                        placeholder=' XXXX@email.com'
                        onChangeText={(text: string) => this.ChangeState(text, "email")}
                        leftIcon={
                            <Icon
                                name='idcard'
                                type="antdesign"
                                size={18}
                                color='black'
                            />}
                    />
                    <Input
                        placeholder=' @@@@@@@@'
                        secureTextEntry={true}
                        onChangeText={(text: string) => this.ChangeState(text, "password")}
                        leftIcon={
                            <Icon
                                name='key'
                                type="antdesign"
                                size={18}
                                color='black'
                            />}
                    />
                    <Input
                        placeholder=' 010-XXXX-XXXX'
                        errorMessage={this.state.error ? "error" : ""}
                        onChangeText={(text: string) => this.ChangeState(text, "phone")}
                        leftIcon={
                            <Icon
                                name='phone'
                                type="antdesign"
                                size={18}
                                color='black'
                            />}
                    />
                </View>
                <View>
                    <Button onPress={this.fetchSignUp} title="OK"></Button>
                </View>
            </View>
        )
    }
}

