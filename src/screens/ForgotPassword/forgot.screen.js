import React from 'react';
import { StatusBar, Text } from 'react-native';
import ForgotPassword from '../../components/forgot-password/forgot.form';
import { ForgotPasswordContainer, Avatar } from './forgot.styles';
import CustomTextContainer from '../../components/forms/custom-text/custom-text.container';
import { NavigationContainer } from '@react-navigation/native';

import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { connect } from 'react-redux';

const ForgotPasswordScreen = ({ navigation, appSettings }) => {
    const {mainColor, defaltColor, backgroundColor } = appSettings;

    const handleBackToLogin = () => {
        navigation.reset({
            index: 0, 
            routes: [{name: 'Login'}]
        })
    }


    return (
        <ForgotPasswordContainer bgcolor={backgroundColor}>
            <StatusBar backgroundColor={'red'} barStyle={'light-content'} />
            <Avatar source={require('../../../assets/logo.png')} />
            <ForgotPassword />
			      <CustomTextContainer txtcolor={'blue'} onPress={handleBackToLogin}>Back to Login</CustomTextContainer>
        </ForgotPasswordContainer>
    );
};

const mapStateToProps = createStructuredSelector ({
    appSettings: selectAppSettings,
});

export default connect(mapStateToProps)(ForgotPasswordScreen);