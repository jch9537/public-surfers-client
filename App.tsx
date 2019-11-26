import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import NewChatScreen from "./screens/newChatScreen";
import AdBanner from "./components/AdBanner";

export interface AppProps {}

export interface AppState {}

class App extends React.Component<AppProps, AppState> {
  render() {
    return <NewChatScreen />;
  }
}

export default App;
