import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Text, Icon, ListItem } from 'react-native-elements';

interface Props {
    hostName: string
    Date: string
    local: string
    PostId: number
    navigation: any
    participate: boolean
}
interface State {
    iconNames: string[]
}
export default class BoardList extends Component<Props, State> {
    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Room")}
                    style={styles.button} >
                    <Image
                        source={require("/Users/yunseunghyeon/Desktop/ChiMe/chiMe-client/assets/surfer.png")}
                        style={{ width: 40, height: 40, borderRadius: 15, marginTop: 5 }}
                    />
                    <Text style={styles.text}>
                        <Text style={{ fontSize: 15 }}>
                            {this.props.Date}  {this.props.local}
                        </Text>
                        <Text style={{ color: "gray", fontSize: 13 }}>
                            {`\n${this.props.hostName}`}
                        </Text>
                    </Text>
                    <Icon
                        name='arrow-right'
                        type="feather"
                        size={30}
                        color='gray'
                        containerStyle={{ position: 'absolute', marginTop: 10, right: 40, alignItems: "flex-end" }}
                    />
                </TouchableOpacity>
                <View style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 0.8,
                    opacity: 0.3
                }} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        height: 55,
        marginTop: 17,
        marginBottom: 10,
        marginLeft: 20
    },
    text: {
        height: 50,
        lineHeight: 25,
        marginLeft: 25
    }
})