import React, {useState} from 'react';
import { Text, StyleSheet } from "react-native";

import { connect } from 'react-redux';
import CustomButton from '../forms/custom-button/custom-button.component';
import CustomInput from '../forms/custom-input/custom-input.component';
import ButtonText from '../forms/button-text/button-text.component';

import { SigninContainer } from './Signin.styles';

const SignIn = ({}) => {
    const [userData, updateData] = useState({email: '', password: ''});
    const {email, password} = userData;
    const [isSubmitting, toggleSubmitting] = useState(false);

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
                placeholder={'Email'}
                bgcolor={'transparent'}
                space={'20px'} 
                leftIcon={'md-mail'} 
                placeholderTextColor={'black'} 
                width={'100%'} 
                radius={'0px'} 
                border={'1px solid black'} 
                underline={'white'} 
                txtcolor={'black'} 
            />
            <CustomInput 
                onChangeText={text => handleChange({ password: text })}
                value={password}
                placeholder={'Password'}
                bgcolor={'transparent'}
                space={'20px'} 
                leftIcon={'md-mail'} 
                placeholderTextColor={'black'} 
                width={'100%'} 
                radius={'0px'} 
                border={'1px solid black'} 
                underline={'white'} 
                txtcolor={'black'} 
                forPassword={true}
            />
            <CustomButton 
            onPress={handleSubmit} 
            space={'20px'} 
            uppercase={'true'} 
            width={'99%'} 
            color={'blue'} 
            bgcolor={'white'} 
            radius={'0px'}
            >
                <ButtonText weight={'bold'}>{'Log In'}</ButtonText>
            </CustomButton>
        </SigninContainer>
    );
}

export default SignIn;