import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const PUSH_ENDPOINT = "https://localhost:3000/chat/push_token";

export default async function registerForPushNotificationsAsync(email: string) {
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

  await console.log("push_token: ", token);

  return fetch(PUSH_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      push_token: token,
      email: email
    })
  });
}
