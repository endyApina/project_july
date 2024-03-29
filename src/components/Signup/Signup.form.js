import React, { useState, useEffect} from 'react'; 
import CustomButton from '../forms/custom-button/custom-button.component';
import CustomInput from '../forms/custom-input/custom-input.component';
import ButtonText from '../forms/button-text/button-text.component';
import { SignupContainer, FormContainer} from './Signup.styles';
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.action';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; 
import {apiHeaders, REG_API, user_role_code} from '../../config';
import {selectIsSubmittingRegister, selectSignUpStatus} from '../../redux/user/user.selector';
// import CustomSelectInput from '../forms/custom-select-input/custom-select';

const SignUp = ({appSettings, isSubmittingForm, signUpStart, signUpSuccessStatus}) => {
    const [ userData, updateData ] = useState({ 
        fullName: '', 
        email: '',  
        phone: '', 
        password: '',
    })
    const navigation = useNavigation();
    const { fullName, email, password, phone } = userData;
    const { transparentBorder,  AppMainColor, AppMainColorShadow, inputSpace, boxShadow, buttonTextColor, defaultButtonBackgroundColor, defaultButtonWidth, inputRadius, defaultInputWidth, defaultInputPlaceholderColor, defaultInputBgColor, defaultInputTextColor} = appSettings;
    const [isSubmitting, toggleSubmitting] = useState(false);
    const [successSignUp, toggleSignUpSuccess] = useState(false);

    const updateType = (type) => {
        updateData({
            ...userData, 
            userType: type
        })
    }

    // useEffect(() => {
    //     toggleSubmitting(isSubmittingForm);
    // }, [isSubmittingForm])

    const handleSubmit = async () => {
        toggleSubmitting(true)
        if (isSubmitting) return;
        var submittedData = validateSignUp()
        if (submittedData != true) return

        const data = {
            "email": email.toLowerCase(), 
            "full_name": fullName, 
            "phone_number": phone, 
            "password": password, 
            "user_type": user_role_code,
        }

        const options = {
            headers: apiHeaders("")
        }

        axios.post(REG_API, data, options)
        .then((response) => {
            console.log(response.data)
            const responseBody = response.data
            const body = responseBody.body 
            const message = responseBody.message
            const code = responseBody.code 

            if (body != "" || message != "" || code != "") {
                toggleSubmitting(false)
                signUpStart({body, message, code})
            } else {
                toggleSubmitting(false)
                console.log("error")
            }
        }, (error) => {
            toggleSubmitting(false)
            console.log(error)
        })
        // signUpStart({email, password, fullName, phone})
    }

    const navigateToIntroSliders = () => {
        // alert("Navigating")
        navigation.reset({
            index: 0,
            routes: [{ name: 'otp' }]
        })
    }

    const handleChange = data => {
        const key = Object.keys(data)[0];
        const val = data[key];
        updateData({ ...userData, [key]: val });
    }

    const validateSignUp = () => {
        if (fullName === "" || email === "" || password === "" || phone === "") {
            alert("Kindly Fill All details")
            return false 
        }
        var passwordLength = password.length
        if (passwordLength < 7) {
            alert("Password requires minimum of 8 characters")
            return false
        }
        return true
    }

    return (
        <SignupContainer>
            <FormContainer>
                <CustomInput 
                    onChangeText={text => handleChange({ fullName: text })}
                    value={fullName}
                    placeholder={'Full Name'}
                    bgcolor={defaultInputBgColor}
                    space={inputSpace} 
                    placeholderTextColor={defaultInputPlaceholderColor} 
                    width={defaultInputWidth} 
                    radius={inputRadius} 
                    border={transparentBorder} 
                    // underline={'white'} 
                    txtcolor={defaultInputTextColor} 
                />
                <CustomInput 
                    onChangeText={text => handleChange({ email: text })}
                    value={email}
                    placeholder={'Email'}
                    bgcolor={defaultInputBgColor}
                    space={inputSpace} 
                    placeholderTextColor={defaultInputPlaceholderColor} 
                    width={defaultInputWidth} 
                    radius={inputRadius} 
                    border={transparentBorder} 
                    // underline={'white'} 
                    txtcolor={defaultInputTextColor} 
                />
                <CustomInput 
                    onChangeText={text => handleChange({ phone: text })}
                    value={phone}
                    placeholder={'Phone'}
                    bgcolor={defaultInputBgColor}
                    space={inputSpace} 
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
                    space={inputSpace} 
                    placeholderTextColor={defaultInputPlaceholderColor} 
                    width={defaultInputWidth} 
                    radius={inputRadius} 
                    border={transparentBorder} 
                    forPassword={true}
                    txtcolor={defaultInputTextColor} 
                />
            </FormContainer>
            <CustomButton 
                onPress={() => handleSubmit()} 
                space={'20px'} 
                uppercase={'true'} 
                loading={isSubmitting}
                width={defaultButtonWidth} 
                color={buttonTextColor} 
                bgcolor={AppMainColor} 
                box-shadow={AppMainColorShadow}
                radius={'10px'}
            >
                <ButtonText weight={'bold'}>{'Register'}</ButtonText>
            </CustomButton>
        </SignupContainer>
    )
}

const mapStateToProps = createStructuredSelector ({
    appSettings: selectAppSettings,
    isSubmittingForm: selectIsSubmittingRegister, 
    signUpSuccessStatus: selectSignUpStatus,
})

const mapDispatchToProps = dispatch => ({
    signUpStart: userData => dispatch(signUpStart(userData))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);