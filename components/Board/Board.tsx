import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    Alert
} from 'react-native';
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
        date: ''
    };
    componentDidMount() {
        this.setState({
            board: fakeBoard
        });
        // fetch("http://54.180.108.45:3000/posts")
        //     .then(res => res.json())
        //     .then(data => {
        //         this.setState({
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
        if (Board === 'board') {
            return (
                <View style={styles.total}>
                    <View style={styles.Choice}>
                        <Choice
                            list={this.state.ListLocal}
                            func={this.ChangeState}
                        />
                    </View>
                    <View style={styles.List}>
                        <SafeAreaView>
                            <ScrollView
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}
                            >
                                {this.state.board.map(item => (
                                    <BoardList
                                        key={item['id']}
                                        hostName={item['host_name']}
                                        Date={item['date']}
                                        local={item['location_name']}
                                        navigation={this.props.navigation}
                                        PostId={item['id']}
                                    />
                                ))}
                            </ScrollView>
                        </SafeAreaView>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.total}>
                    <View style={styles.Choice}>
                        <Choice
                            list={this.state.ListLocal}
                            func={this.ChangeState}
                        />
                    </View>
                    <View style={styles.List}>
                        <SafeAreaView>
                            <ScrollView
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}
                            >
                                {this.state.choiceBoard.map(item => (
                                    <BoardList
                                        key={item['id']}
                                        hostName={item['host_name']}
                                        Date={item['date']}
                                        local={item['location_name']}
                                        navigation={this.props.navigation}
                                        PostId={item['id']}
                                    />
                                ))}
                            </ScrollView>
                        </SafeAreaView>
                    </View>
                </View>
            );
        }
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
    total: {
        flex: 1
    },
    Choice: {
        flex: 1
    },
    List: {
        flex: 7,
        backgroundColor: 'green'
    }
});
