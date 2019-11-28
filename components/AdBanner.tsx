import React from "react";
import { View, Text } from "react-native";
import { AdMobBanner } from "expo-ads-admob";

interface AdBannerProps {}
interface AdBannerState {}

export default class AdBanner extends React.Component<
  AdBannerProps,
  AdBannerState
> {
  constructor(props: AdBannerProps) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-9828921339355562/9508765107"
          testDeviceID="EMULATOR"
          servePersonalizedAds={true}
        />
      </View>
    );
  }
}
