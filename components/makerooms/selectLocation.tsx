import * as React from 'react';
import { Picker, View, Text } from 'react-native';

export interface SelectLocationProps {
    selectLocation: string[];
    checkLocation: any;
}

const SelectLocation: SelectLocationProps = (props: any) => {
    // console.log('큰지역 프롭', props);
    return (
        <View>
            <Picker
                style={{
                    height: 70,
                    width: '100%',
                    alignItems: 'center'
                }}
                onValueChange={itemValue => props.checkLocation(itemValue)}
            >
                {props.selectLocation.map((item: any) => (
                    <Picker.Item label={item} value={item} key={item} />
                ))}
            </Picker>
        </View>
    );
};

export default SelectLocation;
