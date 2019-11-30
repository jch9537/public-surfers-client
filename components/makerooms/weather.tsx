import * as React from "react";
import { View, Text } from "react-native";

export interface WeatherProps {
  currWeather: Array<object>;
}

const Weather: React.SFC<WeatherProps> = (props: WeatherProps) => {
  console.log("웨더 프롭", props);
  return (
    <View>
      {props.currWeather.map((item: any): any => {
        for (let i in item) {
          return <Text key={i}>{`${i} : ${item[i]}`}</Text>;
        }
      })}
    </View>
  );
};

export default Weather;
