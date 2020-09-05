/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, {} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider  } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { View, SafeAreaView, Text, Alert } from 'react-native';
import { UserProfileContainer, UserProfileTextContainer, ButtonContainer } from './Route.styles'; 

import LoginScreen from './src/screens/Login/Login.screen';
import RegistrationScreen from './src/screens/Registration/Registration.screen';
import ForgotPasswordScreen from './src/screens/ForgotPassword/forgot.screen';
import Landing from './src/screens/Landing/index';
import OtpVerification from './src/screens/otp/otpverification';
import { selectConnectionStatus } from './src/redux/user/user.selector';
import AppSlider from './src/screens/AppIntroSlider/index';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectAppSettings} from './src/redux/settings/settings.selector';
import { checkUserSession } from './src/redux/user/user.action';
import Loader from './src/components/utility/loader/loader.component';
import SvgXmlContainer from './src/util/svg-xml/scg-xml.component';
import MainNavigation from './src/navigation/Landing/landing.navigation';
import { userSvg } from './assets/svg/svg';

const Drawer = createDrawerNavigator();

const Routes = ({appSettings, isConnecting}) => {
	const { subColor, defaultColor, transparentColor, sliderOneBackgroundColor } = appSettings;
    const theme = {
        ...DefaultTheme, 
        colors: {
            primary: subColor, 
            accent: defaultColor,
        },
    };

    return (
        <PaperProvider
					theme={theme}
					setting={{
						icon: props => <Ionicons {...props} />,
					}}
			>
					{
						isConnecting ? (<Loader />) : null
					}
					<NavigationContainer>
						<Drawer.Navigator
							drawerContent={props => (
								<View style={{flex: 1}}>
									<SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
										<UserProfileContainer>
										<SvgXmlContainer space={'5px'} width={'100px'} height={'100px'} bg={'transparent'} 	xml={userSvg} />
											<UserProfileTextContainer>
												{"Endy Apinageri"}
											</UserProfileTextContainer>
											<DrawerItemList {...props} />
											<ButtonContainer onPress={()=>
												Alert.alert(
													'Log out',
													'Do you want to logout?',
													[
														{ text: 'Cancel', onPress: () => {return null;} },
														{ text: 'Confirm', onPress: () => signOutStart() },
													],
													{ cancelable: false }
												)  
											}>
												<Ionicons name={'md-log-out'} color={'purple'}  size={30} />
												<Text style={{ textAlign: 'center', marginTop: 5, marginLeft: 30, color: 'purple' }}>Logout</Text>
											</ButtonContainer>
										</UserProfileContainer>
									</SafeAreaView>
								</View>
							)}
							drawerContentOptions = {
								{
									activeTintColor: 'blue', 
									inactiveTintColor: 'green'
								}
							}
							screenOptions={{swipeEnabled: true}}
							initialRouteName="Landing"
							openByDefault={false}
						>
							<Drawer.Screen 
								name="Landing"
								component={MainNavigation}
								options={
									{
										drawerIcon: () => (<Ionicons name={'md-home'} size={30} color={'purple'} />)
									}
								}
							/>
						</Drawer.Navigator>
					</NavigationContainer>
        </PaperProvider>
    )
}

const mapStateToProps = createStructuredSelector({
    appSettings: selectAppSettings, 
    isConnecting: selectConnectionStatus
});

export default connect(mapStateToProps)(Routes)