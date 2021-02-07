import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import CustomButton from '../forms/custom-button/custom-button.component';
import CustomInput from '../forms/custom-input/custom-input.component';
import ButtonText from '../forms/button-text/button-text.component';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { SigninContainer } from './Signin.styles';
import { createStructuredSelector } from 'reselect';
import { useNavigation } from '@react-navigation/native';
import { emailSignInStart } from '../../redux/user/user.action';
import {selectIsSubmittingLogin} from '../../redux/user/user.selector';
import { toHome, toOTP } from '../../session';
import axios from 'axios';
import {apiHeaders, LOGIN_API} from '../../config'

const SignIn = ({emailSignInStart, appSettings, isSubmittingForm}) => {
    const [userData, updateData] = useState({email: '', password: ''});
    const {email, password} = userData;
    const [isSubmitting, toggleSubmitting] = useState(false);
    const { transparentBorder, boxShadow, AppMainColor, buttonTextColor, defaultButtonWidth, inputRadius, defaultInputWidth, defaultInputPlaceholderColor, defaultInputBgColor, defaultInputTextColor} = appSettings
    const navigation = useNavigation();

    const handleSubmit = () => {
        toggleSubmitting(true)
        let validity = validateSignIn()
        if (validity != true) return;
        const options = {
            headers: apiHeaders("")
        }
        axios.post(LOGIN_API, {
            email: email, 
            password: password,
        }, options)
        .then((response) => {
            console.log(response.data)
            const responseData = response.data
            const body = responseData.body 
            const code = responseData.code 
            const message = responseData.message 
 
            if (code != 200) {
                if (message == "unverified user") {
                    emailSignInStart({body, code, message})
                    toOTP(navigation)
                    toggleSubmitting(false)
                    return 
                }
                alert(responseData.message)
                toggleSubmitting(false)
                return 
            } else {
                emailSignInStart({body, code, message})
                toHome(navigation)
                toggleSubmitting(false)
                return 
            }
            
        }, (error) => {
            console.log(error)
        })
        // emailSignInStart({phone, password})
        // toHome(navigation)
    };

    const handleChange = data => {
        const key = Object.keys(data)[0];
        const val = data[key];
        updateData({...userData, [key]: val});
    };

    const validateSignIn = () => {
        if (email === "" || password === "") {
            alert("Kindly Fill All details")
            toggleSubmitting(false)
            return false 
        }
        return true
    }

    // useEffect(() => {
    //     toggleSubmitting(isSubmittingForm);
    // }, [isSubmittingForm])
  
    return (
        <SigninContainer>
            <CustomInput 
                onChangeText={text => handleChange({ email: text })}
                value={email}
                placeholder={'Email'}
                bgcolor={defaultInputBgColor}
                space={'5px'} 
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
            loading={isSubmitting}
            space={'20px'} 
            uppercase={'true'} 
            width={defaultButtonWidth} 
            color={buttonTextColor} 
            bgcolor={AppMainColor} 
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
    isSubmittingForm: selectIsSubmittingLogin
});

const mapDispatchToProps = dispath => ({
    emailSignInStart: emailAndPassword => dispath(emailSignInStart(emailAndPassword))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);