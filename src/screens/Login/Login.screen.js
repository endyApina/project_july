import React from 'react';
import { StatusBar, Text } from 'react-native';
import Signin from '../../components/Signin/Signin.form';
import { LoginContainer } from './Login.styles';
import SignIn from '../../components/Signin/Signin.form';
import CustomTextContainer from '../../components/forms/custom-text/custom-text.container';
import { NavigationContainer } from '@react-navigation/native';

import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { connect } from 'react-redux';

const LoginScreen = ({ navigation, appSettings }) => {
    const {mainColor, defaltColor, backgroundColor } = appSettings;

    return (
        <LoginContainer bgcolor={backgroundColor}>
            <StatusBar backgroundColor={'red'} barStyle={'light-content'} />
            <SignIn />
            <CustomTextContainer txtcolor={'blue'} onPress={() => {}} >Forget Password</CustomTextContainer>
			<CustomTextContainer txtcolor={'blue'} onPress={() => navigation.push('Registration')}>New user? Create account</CustomTextContainer>
        </LoginContainer>
    );
};

const mapStateToProps = createStructuredSelector ({
    appSettings: selectAppSettings,
});

export default connect(mapStateToProps)(LoginScreen);