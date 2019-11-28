import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    Alert
} from 'react-native';
import { post } from "../fetch";
import { fakeBoard } from '../fakeData/board';
import BoardList from './BoardList';
import Choice from './Choice';

interface Props {
    navigation: any;
}
interface State {
    board: Posts[];
    date: string;
    ListLocal: string[];
    choiceBoard: Array<any>;
    pickLocal: string;
}
interface Posts {
    id: number;
    host_name: string;
    location_name: string;
    date: string;
}
export default class Board extends Component<Props, State> {
    static navigationOptions = ({ navigation }: any) => {
        let headerTitle = 'RoomList';
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
    state = {
        board: [],
        ListLocal: ['---', '제주도', '천안', '부산'],
        pickLocal: '',
        choiceBoard: [],
        date: '',
    };
    async componentDidMount() {
        this.setState({
            board: fakeBoard
        })
        // post("GET")
        //     .then(res => { console.log("res", res); return res.json() })
        //     .then(data => {
        //         console.log(data);
        //         return this.setState({
        //             board: data
        //         })
        //     })
    }
    ChangeState = (value: string): any => {
        this.setState({
            pickLocal: value
        });
        let choices: Posts[] = [];
        for (let i = 0; i < this.state.board.length; i++) {
            if (this.state.board[i]['location_name'] === value) {
                choices.push(this.state.board[i]);
            }
        }
        this.setState({
            choiceBoard: choices
        });
    };
    _render = (Board: any): any => {
        return (
            <View>
                <Choice
                    list={this.state.ListLocal}
                    func={this.ChangeState}
                />
                <View style={styles.List}>
                    <ScrollView
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        {this.state[Board].map((item: any) => (
                            <BoardList
                                key={item['id']}
                                hostName={item['host_name']}
                                Date={item['date']}
                                local={item['location_name']}
                                navigation={this.props.navigation}
                                PostId={item['id']}
                                participate={item["participate"]}
                            />
                        ))}
                    </ScrollView>
                </View>
            </View >
        );
    };

    render() {
        if (this.state.board.length > 0) {
            if (this.state.pickLocal.length > 0) {
                return this._render('choiceBoard');
            } else {
                return this._render('board');
            }
        } else {
            return <View></View>;
        }
    }
}

const styles = StyleSheet.create({
    List: {
        backgroundColor: 'white'
    }
});
