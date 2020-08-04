import React, {useState} from 'react';
import { Text, StyleSheet } from "react-native";

import { connect } from 'react-redux';
import CustomButton from '../forms/custom-button/custom-button.component';
import CustomInput from '../forms/custom-input/custom-input.component';
import ButtonText from '../forms/button-text/button-text.component';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { SigninContainer } from './Signin.styles';
import { createStructuredSelector } from 'reselect';
import { appSettings } from '../../config';

const SignIn = ({}) => {
    const [userData, updateData] = useState({email: '', password: ''});
    const {email, password} = userData;
    const [isSubmitting, toggleSubmitting] = useState(false);
    const { transparentBorder, boxShadow, buttonTextColor, defaultButtonBackgroundColor, defaultButtonWidth, inputRadius, defaultInputWidth, defaultInputPlaceholderColor, defaultInputBgColor, defaultInputTextColor} = appSettings

    const handleSubmit = () => {
        console.log("Submitting")
    };

    const handleChange = data => {
        const key = Object.keys(data)[0];
        const val = data[key];
        updateData({...userData, [key]: val});
    };
  
    return (
        <SigninContainer>
            <CustomInput 
                onChangeText={text => handleChange({ email: text })}
                value={email}
                autoCompleteType={'email'}
                placeholder={'Email/Username'}
                bgcolor={defaultInputBgColor}
                space={'20px'} 
                placeholderTextColor={defaultInputPlaceholderColor} 
                width={defaultInputWidth} 
                radius={inputRadius} 
                border={transparentBorder} 
                // underline={'white'} 
                txtcolor={defaultInputTextColor} 
            />
            <CustomInput 
                onChangeText={text => handleChange({ password: text })}
                value={password}
                placeholder={'Password'}
                bgcolor={defaultInputBgColor}
                space={'20px'} 
                placeholderTextColor={defaultInputPlaceholderColor} 
                width={defaultInputWidth} 
                radius={inputRadius} 
                border={transparentBorder} 
                forPassword={true}
                txtcolor={defaultInputTextColor} 
            />
            <CustomButton 
            onPress={handleSubmit} 
            space={'20px'} 
            uppercase={'true'} 
            width={defaultButtonWidth} 
            color={buttonTextColor} 
            bgcolor={defaultButtonBackgroundColor} 
            box-shadow={boxShadow}
            radius={'10px'}
            >
                <ButtonText weight={'bold'}>{'Log In'}</ButtonText>
            </CustomButton>
        </SigninContainer>
    );
};

const mapStateToProps = createStructuredSelector ({
    appSettings: selectAppSettings,
})

export default connect(mapStateToProps)(SignIn);