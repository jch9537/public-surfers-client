// import * as React from 'react';
// import { View, Text } from 'react-native';

// import { localPoints, realTimeWeather } from '../utils/util';

// export interface WeatherProps {
//     surfPoint: string;
// }

// export interface WeatherState {
//     x: number | null;
//     y: number | null;
// }

// class Weather extends React.Component<WeatherProps, WeatherState> {
//     state = {
//         spot: this.props.surfPoint,
//         x: null,
//         y: null
//     };

//     ChangeXYspot() {
//         for (let i = 0; i < localPoints.length; i++) {
//             if (Object.keys(localPoints[i])[0] === this.state.spot) {
//                 this.setState({
//                     x: localPoints[i][this.state.spot].x,
//                     y: localPoints[i][this.state.spot].y
//                 });
//             }
//         }
//     }

//     render() {
//         console.log('엑스와이', this.state.x, '----------', this.state.y);
//         return (
//             <View>
//                 <Text>{this.props.surfPoint}</Text>
//             </View>
//         );
//     }
// }

// export default Weather;
