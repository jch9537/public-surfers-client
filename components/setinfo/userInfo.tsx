import * as React from 'react';
import { Component } from 'react';
import {
    View,
    StyleSheet,
    ViewStyle,
    TouchableOpacity,
    Text,
    TextInput
} from 'react-native';
import { Avatar, Input, Icon, Button } from 'react-native-elements';

interface Style {
    infoContainer: ViewStyle;
    img?: ViewStyle;
    input?: ViewStyle;
}

export interface UserInfoProps {
    editName: any;
    editPassword: any;
    editInfo: any;
}

export interface UserInfoState {
    name: string | null;
    password: string | null;
}

class UserInfo extends Component<UserInfoProps, UserInfoState> {
    constructor(props: UserInfoProps) {
        super(props);
        this.state = { name: null, password: null };
    }
    render() {
        // console.log('프롭확인 ', this.props);
        return (
            <View style={styles.infoContainer}>
                <View style={styles.input}>
                    <Avatar
                        style={{ flex: 1, width: 180, height: 180 }}
                        source={{
                            uri:
                                'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
                        }}
                        showEditButton
                    />
                    <View style={{ flex: 1, top: 20, width: '80%' }}>
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: 'gray',
                                borderWidth: 1
                            }}
                            onChangeText={text => this.props.editName(text)}
                        />
                        <Text>{'New Name: ' + this.state.name}</Text>
                        {/* <Input
                            onChage={text => this.props.editName(this.value)}
                            leftIcon={
                                <Icon name="face" size={24} color="black" />
                            }
                            placeholder="PARK JISUNG"
                            rightIcon={
                                <Icon name="done" size={24} color="black" />
                            }
                            value=""
                        /> */}
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: 'gray',
                                borderWidth: 1
                            }}
                            onChangeText={(text): string =>
                                this.props.editPassword(text)
                            }
                            // string 타입문제확인
                        />
                        <Text>{'New Password: ' + this.state.password}</Text>
                        {/* <Input
                            leftIcon={
                                <Icon name="lock" size={24} color="black" />
                            }
                            placeholder="NEW PASSWORD"
                            rightIcon={
                                <Icon name="done" size={24} color="black" />
                            }
                        /> */}
                        <TouchableOpacity
                            title="Edit"
                            style={{ width: 50 }}
                            onPress={this.props.editInfo}
                        >
                            <Text>EDIT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default UserInfo;

const styles = StyleSheet.create<Style>({
    infoContainer: {
        flex: 1,
        backgroundColor: 'lightgrey'
    },
    input: {
        alignItems: 'center',
        flex: 0.7,
        top: 70,
        width: '100%',
        backgroundColor: 'violet'
    }
});
