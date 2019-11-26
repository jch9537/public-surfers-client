import * as React from 'react';
import { Picker, View, Text } from 'react-native';

export interface CheckPointProps {
    detailLocation: string[];
    checkSpot: any;
}

const CheckPoint: CheckPointProps = (props: any) => {
    // console.log('체크포인트 프롭', props);
    return (
        <View>
            <Picker
                style={{
                    height: 70,
                    width: '100%',
                    alignItems: 'center'
                }}
                onValueChange={itemValue => props.checkSpot(itemValue)}
            >
                {props.detailLocation.map((item: any) => (
                    <Picker.Item label={item} value={item} key={item} />
                ))}
            </Picker>
        </View>
    );
};

export default CheckPoint;
