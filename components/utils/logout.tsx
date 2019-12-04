import * as React from "react";
import { AsyncStorage } from "react-native";
import { Alert, View, Image, Text, StyleSheet } from "react-native";

const logoutAlert = (nav: any): void => {
  return Alert.alert("", "로그아웃 하시겠습니까?", [
    {
      text: "취소",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    {
      text: "확인",
      onPress: () => {
        AsyncStorage.removeItem("userToken");
        nav.navigate("SignPart");
      }
    }
  ]);
};

const LogoutIcon = (nav: any) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logout.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <Text style={{ marginRight: 10 }} onPress={() => logoutAlert(nav)}>
        Logout
      </Text>
    </View>
  );
};

export default LogoutIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 30,
    height: 30,
    margin: 5
  }
});
//세팅옵션인데 확인하고 상관없으면 지우기
// navigationOptions: ({ navigation }: any) => {
//   let headerTitle = "Setting";
//   let headerRight = (
//     <View style={styles.container}>
//       <Image
//         source={require("./assets/images/logout.png")}
//         resizeMode="contain"
//         style={styles.image}
//       ></Image>
//       <Text style={{ marginRight: 10 }} onPress={() => Logout(navigation)}>
//         Logout
//       </Text>
//     </View>
//   );

//   return {
//     headerTitle,
//     headerRight
//   };
// }
