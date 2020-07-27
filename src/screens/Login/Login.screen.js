import React from 'react';
import { StatusBar, Text } from 'react-native';
import Signin from '../../components/Signin/Signin.form';
import { LoginContainer } from './Login.styles';
import SignIn from '../../components/Signin/Signin.form';
import CustomTextContainer from '../../components/forms/custom-text/custom-text.container';
import { NavigationContainer } from '@react-navigation/native';

const LoginScreen = ({}) => {
    return (
        <LoginContainer bgcolor={'white'}>
            <StatusBar backgroundColor={'red'} barStyle={'light-content'} />
            <SignIn />
            <CustomTextContainer txtcolor={'blue'} onPress={() => {}} >Forget Password</CustomTextContainer>
			<CustomTextContainer txtcolor={'blue'} onPress={() => {}}>New user? Create account</CustomTextContainer>
        </LoginContainer>
    );
};

export default LoginScreen;