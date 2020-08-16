import React from 'react'; 
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { RegsitrationContainer } from './Registration.styles';
import SignUp from '../../components/Signup/Signup.form';
import { selectAppSettings } from '../../redux/settings/settings.selector';
// import CustomHeader from '../../components/forms/';
import {Avatar } from '../../components/Signup/Signup.styles';
import CustomTextContainer from '../../components/forms/custom-text/custom-text.container';

const RegistrationScreen = ({navigation, appSettings}) => {
    const { mainColor, defaultColor } = appSettings;

    return (
        <ScrollView>
            <RegsitrationContainer>
            <Avatar source={require('../../../assets/logo.png')} />
            {/* <CustomHeader tintColor={mainColor} headerBg={defaultColor}  /> */}
			{/* <PageTitle title={'Sign Up.'} maincolor={mainColor} subcolor={mainColor} /> */}
            <SignUp />
			<CustomTextContainer txtcolor={mainColor} onPress={() => navigation.navigate('Login')}>Already have an account? Login</CustomTextContainer>
        </RegsitrationContainer>
        </ScrollView>
    )
}

const mapStateToProps = createStructuredSelector({
    appSettings: selectAppSettings,
})

export default connect(mapStateToProps)(RegistrationScreen);