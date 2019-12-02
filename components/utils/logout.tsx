import { AsyncStorage } from 'react-native';
import { Alert } from "react-native";

const logoutAlert = (nav: any): void => {
    return Alert.alert(
        '로그아웃 하기',
        "",
        [
            {
                text: '나가기',
                onPress: () => {
                    AsyncStorage.removeItem("userToken");
                    nav.navigate("LoadingPart");
                }
            },
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }
        ]
    )
}
export default logoutAlert;