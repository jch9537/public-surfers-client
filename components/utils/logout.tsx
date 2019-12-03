import { AsyncStorage } from "react-native";
import { Alert } from "react-native";

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
export default logoutAlert;
