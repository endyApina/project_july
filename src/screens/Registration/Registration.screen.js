import React, { useEffect } from 'react'; 
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { RegsitrationContainer } from './Registration.styles';
import SignUp from '../../components/Signup/Signup.form';
import { selectAppSettings } from '../../redux/settings/settings.selector';
// import CustomHeader from '../../components/forms/';
import { useNavigation } from '@react-navigation/native';
import {Avatar } from '../Login/Login.styles';
import CustomTextContainer from '../../components/forms/custom-text/custom-text.container';
import {selectCurrentUser} from '../../redux/user/user.selector';

const RegistrationScreen = ({appSettings, currentUser}) => {
    const { mainColor, LoginCustomTextColor, backgroundColor } = appSettings;
    const navigation = useNavigation();

    const navigateToNextSlide = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'otp' }]
        })
    }

    useEffect(() => {
        if (currentUser) navigateToNextSlide()
    }, [currentUser])

    return (
        <ScrollView>
            <RegsitrationContainer bgcolor={backgroundColor}>
                <Avatar source={require('../../../assets/logo.png')} />
                <SignUp />
                <CustomTextContainer 
                    txtcolor={LoginCustomTextColor} 
                    onPress={() => navigation.navigate('Login')}>Already have an account? Login</CustomTextContainer>
            </RegsitrationContainer>
        </ScrollView>
    )
}

const mapStateToProps = createStructuredSelector({
    appSettings: selectAppSettings,
    currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(RegistrationScreen);