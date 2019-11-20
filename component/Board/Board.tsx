import React, { Component } from 'react';
import {
    View, SafeAreaView, ScrollView, StyleSheet
} from "react-native";
import { fakeBoard } from "../fakeData/board"
import BoardList from "./BoardList"
import Choice from "./Choice"


interface Props {
    navigation: any
}
interface State {
    board: Array<Posts>
    date: string
    location_name: string
    page: number
}
interface Posts {
    id: number,
    host_name: string,
    location_name: string,
    date: string,
}
export default class Board extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = ({
            board: [],
            location_name: "",
            date: "",
            page: 0
        })
    }
    componentDidMount() {
        fetch("http://54.180.108.45:3000/posts")
            .then(res => res.json())
            .then(data => {
                console.log("data", data)
                this.setState({
                    board: fakeBoard
                })
            })
    }
    ChangeState = (value: string, key: any) => {
        // const obj = { [key]: value } as Pick<State, keyof State>
        let result = [];
        for (let i = 0; i < this.state.board.length; i++) {
            if (this.state.board[i][key] === value) {
                result.push(this.state.board[i])
            }
        }
        this.setState({ board: result })
        //board 부분 갱신되는 거 다시 확인
    }

    render() {
        if (this.state.board.length > 0) {
            return (
                <View style={styles.total}>
                    <View style={styles.Choice}>
                        <Choice board={this.state.board} func={this.ChangeState} />
                    </View>
                    <View style={styles.List} >
                        <SafeAreaView>
                            <ScrollView
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}>
                                {this.state.board.map((item) => <BoardList key={item["id"]} hostName={item["host_name"]} Date={item["date"]} local={item["location_name"]} navigation={this.props.navigation} PostId={item["id"]} />)}
                            </ScrollView>
                        </SafeAreaView>
                    </View>
                </View>
            )
        } else {
            return (
                <View></View>
            )
        }
    }
}

const styles = StyleSheet.create({
    total: {
        flex: 1
    },
    Choice: {
        flex: 1,
        backgroundColor: "red",
        alignItems: 'center'
    },
    List: {
        flex: 7,
        backgroundColor: "green"
    }
}) 
