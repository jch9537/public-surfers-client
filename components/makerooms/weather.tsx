import * as React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";

export interface WeatherProps {
  currWeather: Array<object>;
}

const weatherIcon = (item: any) => {
  for (let i in item) {
    if (i === "강수확률") {
      return (
        <View style={styles.weatherValues} key={i}>
          <MaterialCommunityIcons
            size={50}
            name="weather-rainy"
          ></MaterialCommunityIcons>
          <Text>{`${item[i]}`}</Text>
        </View>
      );
    } else if (i === "파고") {
      return (
        <View style={styles.weatherValues} key={i}>
          <MaterialCommunityIcons
            size={50}
            name="waves"
          ></MaterialCommunityIcons>
          <Text>{`${item[i]}`}</Text>
        </View>
      );
    } else if (i === "풍속") {
      return (
        <View style={styles.weatherValues} key={i}>
          <Feather size={50} name="wind"></Feather>
          <Text>{`${item[i]}`}</Text>
        </View>
      );
    } else if (i === "하늘") {
      if (item[i] === "맑음") {
        return (
          <View style={styles.weatherValues} key={i}>
            <Feather size={50} name="sun"></Feather>
            <Text>{`${item[i]}`}</Text>
          </View>
        );
      } else if (item[i] === "구름많음") {
        return (
          <View style={styles.weatherValues} key={i}>
            <Ionicons size={50} name="md-cloud-outline"></Ionicons>
            <Text>{`${item[i]}`}</Text>
          </View>
        );
      } else if (item[i] === "흐림") {
        return (
          <View style={styles.weatherValues} key={i}>
            <Ionicons size={50} name="md-cloud"></Ionicons>
            <Text>{`${item[i]}`}</Text>
          </View>
        );
      }
    }
  }
};

const Weather: React.SFC<WeatherProps> = (props: WeatherProps) => {
  // console.log("웨더 프롭", props);
  return (
    <View
      // source={require("../../assets/images/background3.png")}
      style={styles.weatherContainer}
    >
      {props.currWeather.map((item: any): any => {
        return weatherIcon(item);
      })}
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    // backgroundColor: "green",
    flexDirection: "row",
    margin: 10,
    // justifyContent: "center",
    alignItems: "center"
  },
  weatherValues: {
    flex: 1,
    alignItems: "center"
  }
});
