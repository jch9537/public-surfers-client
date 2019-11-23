import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, ViewStyle, Alert, Button } from 'react-native';
import { Icon } from 'react-native-elements';
// import { Header, Avatar } from 'react-native-elements';

// import MenuBar from './menubar';
import UserInfo from './userInfo';
import { fetchAPI } from '../fetch';

interface Style {
    setContainer: ViewStyle;
    infoContainer: ViewStyle;
}
export interface SettingProps {}
export interface SettingState {
    name?: any;
    password?: any;
    inputInfo?: any;
}

class Setting extends Component<SettingProps, SettingState> {
    constructor(props: SettingProps) {
        super(props);

        this.state = { name: null, password: null, inputInfo: null };
    }
    static navigationOptions = ({ navigation }: any) => {
        let headerTitle = 'Setting';
        // let headerTitleStyle = { color: 'black' }; // 띄어쓰기 해야함
        let headerRight = (
            <Text onPress={() => Alert.alert('로그아웃')}>Logout</Text>
        );
        // let headerLeft = (
        //     <Icon name="home" onPress={() => navigation.navigate('Test1')} />
        // );

        return {
            headerTitle,
            // headerTitleStyle,
            headerRight
            // headerLeft
        };
    };

    headerButtonRight = (): void => {
        console.log('안녕');
    };

    editInfo = (): void => {
        const inputInfo = {
            name: this.state.name,
            password: this.state.password
        };
        console.log('에딧인풋', inputInfo);
        // fetchAPI('/setting', 'POST', inputInfo); // url넣기
    };

    editName = (name?: string | null): void => {
        // 안적으면 자동으로 void가 됨: 지워도 됨
        console.log('불러온 값 비번: ', name);
        this.setState({ name });
    };

    editPassword = (password?: string | null): void => {
        console.log('불러온 값 비번: ', password);
        this.setState({ password });
    };

    render() {
        // console.log('세팅프롭', this.props);
        // console.log('여기스테이트 :', this.state.inputInfo);
        return (
            <View style={styles.setContainer}>
                <View>{/* <MenuBar></MenuBar>필요없음 */}</View>
                {/* style={styles.menuContainer} */}
                <View style={styles.infoContainer}>
                    <UserInfo
                        info={this.state}
                        editInfo={this.editInfo}
                        editName={this.editName}
                        editPassword={this.editPassword}
                    ></UserInfo>
                </View>
                {/* style={styles.infoContainer} */}
            </View>
        );
    }
}

export default Setting;

const styles = StyleSheet.create<Style>({
    setContainer: {
        flex: 1,
        backgroundColor: 'yellow'
    },

    infoContainer: {
        flex: 1,
        height: 100,
        backgroundColor: 'green'
    }
});
