import React from 'react'; 
import { StyleSheet } from 'react-native';
import CustomText from './custom-forms/custom-text';
import {GenericStyles} from '../../components/utility/styles/GenericStyles';

const TimerText = props => {
    const {text, time} = props; 

    return (
        <CustomText
            styles={[
                GenericStyles.centerAlignedText, 
                styles.resendOtpTimerText, 
                GenericStyles.mt24
            ]}
        >
            {text}
            <CustomText styles={GenericStyles.bold}>{' ' + time}s</CustomText>
        </CustomText>
    );
};

const styles = StyleSheet.create({
    resendOtpTimerText: {
        fontSize: 12, 
    },
});

export default TimerText