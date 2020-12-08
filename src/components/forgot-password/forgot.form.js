import React, {useState, useEffect} from 'react';
import { Text, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import CustomButton from '../forms/custom-button/custom-button.component';
import CustomInput from '../forms/custom-input/custom-input.component';
import ButtonText from '../forms/button-text/button-text.component';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { ForgetPasswordContainer } from './forgot.styles';
import { createStructuredSelector } from 'reselect';
import { useNavigation } from '@react-navigation/native';
import { startForgetPassword, emailSignInStart } from '../../redux/user/user.action';
import { selectIsSubmittingForgotPassword } from '../../redux/user/user.selector';

const ForgotPassword = ({startForgetPassword, appSettings, isForgettingPassword}) => {
    const [email, updateEmail] = useState('');
    const [isSubmitting, toggleSubmitting] = useState(false);
    const { transparentBorder, boxShadow, AppMainColor, buttonTextColor, defaultButtonBackgroundColor, defaultButtonWidth, inputRadius, defaultInputWidth, defaultInputPlaceholderColor, defaultInputBgColor, defaultInputTextColor} = appSettings
    const navigation = useNavigation();

    const handleSubmit = () => {
        let validity = validateSignIn()
        if (validity != true) return;
        startForgetPassword(email)
        // navigateToNextSlide()
    };

    const navigateToNextSlide = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Landing' }]
        })
    }

    const validateSignIn = () => {
        if (email === "" ) {
            alert("Kindly Enter Email")
            return false 
        }
        return true
    }

    useEffect(() => {
        toggleSubmitting(isForgettingPassword);
    }, [isForgettingPassword])
  
    return (
        <ForgetPasswordContainer>
            <CustomInput 
                onChangeText={text => updateEmail(text)}
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
            <CustomButton 
            onPress={handleSubmit} 
            loading={isForgettingPassword}
            space={'20px'} 
            uppercase={'true'} 
            width={defaultButtonWidth} 
            color={buttonTextColor} 
            bgcolor={AppMainColor} 
            box-shadow={boxShadow}
            radius={'10px'}
            >
                <ButtonText weight={'bold'}>{'Submit'}</ButtonText>
            </CustomButton>
        </ForgetPasswordContainer>
    );
};

const mapStateToProps = createStructuredSelector ({
    appSettings: selectAppSettings,
    isForgettingPassword: selectIsSubmittingForgotPassword
});

const mapDispatchToProps = dispath => ({
    startForgetPassword: email => dispath(startForgetPassword(email)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);