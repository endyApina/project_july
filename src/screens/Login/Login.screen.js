import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { LoginContainer, SignInContainer, Avatar, GettingStartedContainer, GettingStartedText } from './Login.styles';
import SignIn from '../../components/Signin/Signin.form';
import CustomTextContainer from '../../components/forms/custom-text/custom-text.container';

import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import {selectCurrentUser, selectVerifiedUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';
import { toHome } from '../../session';
import { getUserData } from '../../config';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({ appSettings, verifiedUser }) => {
    const {backgroundColor, LoginCustomTextColor } = appSettings;
    const [isLoggedIn, toggleUserLoggedIn] = useState(false); 
    const [user, updateUser] = useState('');
		const [startup, toggleStartup] = useState(true)
    const navigation = useNavigation();

    if (isLoggedIn) {
        toHome(navigation)
    }
    
    useEffect(() => {
      getUserData().then((res) => {
				if (res.token_string != "" || res.user_role.id != 0) {
					toggleUserLoggedIn(true)
					toggleStartup(false)
				} else {
					toggleStartup(false) 
				}
			}).catch((err) => {
				toggleStartup(false) 
				console.log(err)
			})
    }, [])

    useEffect(() => {
        if(verifiedUser == 2) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'otp' }]
            })
        }
    }, [verifiedUser])

		const GettingStarted = () => {
			return (
				<GettingStartedContainer> 
					<ActivityIndicator 
						size="large"
						color="#bababa"
					/>
					<GettingStartedText> 
						{"Getting Started"}
					</GettingStartedText>
				</GettingStartedContainer>
			)
		}

    return (
        <>
					{
						!startup ? 
						<LoginContainer bgcolor={backgroundColor}>
								<Avatar source={require('../../../assets/gastogologo.png')} />
								<SignInContainer>
										<SignIn />
								</SignInContainer>
								{/* <CustomTextContainer 
										txtcolor={LoginCustomTextColor}
										fontweight={'bolder'} 
										onPress={() => navigation.push('ForgotPassword')}
								>
										Forgot Password?
								</CustomTextContainer> */}
								<CustomTextContainer txtcolor={LoginCustomTextColor} onPress={() => navigation.push('Registration')}>New user? Create account</CustomTextContainer>
						</LoginContainer>
						:
						<GettingStarted />
					}
				</>
    );
};

const mapStateToProps = createStructuredSelector ({
    appSettings: selectAppSettings,
    currentUser: selectCurrentUser, 
    verifiedUser: selectVerifiedUser, 
});

export default connect(mapStateToProps)(LoginScreen);