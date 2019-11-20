import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Icon } from 'react-native-elements';
interface Props{
    
}
export default class BoardList extends Component<Porps> {

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Room", { PostId: this.props.PostId })} >
                    <View style={styles.button}>
                        <Text style={styles.text}>
                            {this.props.hostName}/{this.props.Date}/{this.props.local}
                        </Text>
                        <Icon
                            name='right'
                            type="antdesign"
                            size={19}
                            color='black'

                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    button: {
        flex: 1,
        height: 24,
        flexDirection: 'row',
        backgroundColor: "white"
    },
    text: {
        fontSize: 20,
    }
})