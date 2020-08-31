import React, { useState, useEffect } from 'react';
import { StatusBar, Text } from 'react-native';
import { LoginContainer, Avatar } from './Login.styles';
import SignIn from '../../components/Signin/Signin.form';
import CustomTextContainer from '../../components/forms/custom-text/custom-text.container';

import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { selectUserLoggedIn, selectCurrentUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';
import { toHome } from '../../session';

const LoginScreen = ({ navigation, appSettings, userLoggedIn, selectCurrentUser }) => {
    const {mainColor, defaltColor, backgroundColor } = appSettings;
    const [isLoggedIn, toggleUserLoggedIn] = useState(false); 
    const [user, updateUser] = useState('');

    if (isLoggedIn) {
        alert()
        navigateToLanding()
    }

    useEffect(() => {
        if(userLoggedIn) toHome(navigation)
    }, [userLoggedIn])

    return (
        <LoginContainer bgcolor={backgroundColor}>
            <StatusBar backgroundColor={'red'} barStyle={'light-content'} />
            <Avatar source={require('../../../assets/logo.png')} />
            <SignIn />
            <CustomTextContainer txtcolor={'blue'} onPress={() => navigation.push('ForgotPassword')}>Forgot Password?</CustomTextContainer>
			<CustomTextContainer txtcolor={'blue'} onPress={() => navigation.push('Registration')}>New user? Create account</CustomTextContainer>
        </LoginContainer>
    );
};

const mapStateToProps = createStructuredSelector ({
    appSettings: selectAppSettings,
    userLoggedIn: selectUserLoggedIn, 
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(LoginScreen);