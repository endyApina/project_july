import React, {useState} from 'react'; 
import CustomButton from '../forms/custom-button/custom-button.component';
import CustomInput from '../forms/custom-input/custom-input.component';
import ButtonText from '../forms/button-text/button-text.component';

import { SignupContainer} from './Signup.styles';
import { createStructuredSelector } from 'reselect';
import {appSettings} from '../../config';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.action';
import {registration} from '../../util/user.util';
import {Picker} from "react-native";
import { useNavigation } from '@react-navigation/native';
// import CustomSelectInput from '../forms/custom-select-input/custom-select';

const SignUp = ({appSettings}) => {
    const [ userData, updateData ] = useState({ 
        fullName: '', 
        email: '',  
        phone: '', 
        userType: '', 
        password: '',
    })
    const navigation = useNavigation();
    const { fullName, email, password, phone, userType } = userData;
    const { transparentBorder, inputSpace, boxShadow, buttonTextColor, defaultButtonBackgroundColor, defaultButtonWidth, inputRadius, defaultInputWidth, defaultInputPlaceholderColor, defaultInputBgColor, defaultInputTextColor} = appSettings;
    const [isSubmitting, toggleSubmitting] = useState(false);

    const updateType = (type) => {
        updateData({
            ...userData, 
            userType: type
        })
    }

    const handleSubmit = async () => {
        if (isSubmitting) return;
        var submittedData = validateSignUp()
        if (submittedData != true) {
            return 
        }
        // toggleSubmitting(true)
        // await signUpStart({email, password, fullName, phone, userType})
        // await registration(userData)
        // toggleSubmitting(false);
        navigateToIntoSliders()
    }

    const navigateToIntoSliders = () => {
        alert("Navigating")
        navigation.reset({
            index: 0,
            routes: [{ name: 'AppSlider' }]
        })
    }

    const handleChange = data => {
        const key = Object.keys(data)[0];
        const val = data[key];
        updateData({ ...userData, [key]: val });
    }

    const validateSignUp = () => {
        if (fullName === "" || email === "" || password === "" || phone === "" || userType === "") {
            alert("Kindly Fill All details")
            return false 
        }
        return true
    }

    return (
        <SignupContainer>
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
            <Picker
                // selectedValue={(userData && userData.userType) || "vendor"}
                selectedValue={userType}
                space={inputSpace}
                style={{width: defaultInputWidth}}
                onValueChange={(itemValue, itemIndex) => {
                    handleChange({ userType: itemValue })
                }}
            >
                <Picker.Item label="Customer" value="customer" />
                <Picker.Item label="Vendor" value="vendor" />
            </Picker>
            <CustomButton 
            onPress={() => handleSubmit()} 
            space={'20px'} 
            uppercase={'true'} 
            width={defaultButtonWidth} 
            color={buttonTextColor} 
            bgcolor={defaultButtonBackgroundColor} 
            box-shadow={boxShadow}
            radius={'10px'}
            >
                <ButtonText weight={'bold'}>{'Register'}</ButtonText>
            </CustomButton>
        </SignupContainer>
    )
}

const mapStateToProps = createStructuredSelector ({
    appSettings: selectAppSettings,
})

const mapDispatchToProps = dispatch => ({
    signUpStart: userData => dispatch(signUpStart(userData))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);