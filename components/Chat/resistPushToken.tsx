import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { AsyncStorage } from "react-native";

const PUSH_ENDPOINT = "http://15.164.218.247:3000/chat/push_token";

export default async function registerForPushNotificationsAsync(
  server: string,
  email: string
) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();
  await AsyncStorage.setItem("pushToken", token);

  let body = {
    push_token: token,
    email: email
  };

  await fetch(server, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    credentials: "include"
  })
    .then(res => res)
    .then(res => console.log("post push token result: ", res));
}
