/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, {} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './src/screens/Login/Login.screen';
import RegistrationScreen from './src/screens/Registration/Registration.screen';
import Landing from './src/screens/Landing/index';
import OtpVerification from './src/screens/otp/otpverification';
import { selectConnectionStatus } from './src/redux/user/user.selector';
import AppSlider from './src/screens/AppIntroSlider/index';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectAppSettings} from './src/redux/settings/settings.selector';
import { checkUserSession } from './src/redux/user/user.action';
import Loader from './src/components/utility/loader/loader.component';

const Stack = createStackNavigator();

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
                <Stack.Navigator
                    screenOptions={{
						headerStyle: {
							backgroundColor: 'white',
						},
						headerTintColor: '#4a4c4f',
						headerTitleStyle: {
							fontWeight: 'bold',
							color: 'transparent',
						},
					}}
					initialRouteName="Landing"
                >
                    <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
                    <Stack.Screen name="Registration" component={RegistrationScreen} options={{ title: 'Sign Up' }} />
                    <Stack.Screen name="Landing" component={Landing} options={{title: 'Landing'}} />
                    <Stack.Screen 
                        name="AppSlider" 
                        component={AppSlider} 
                        options={{
                            headerStyle: {
                                backgroundColor: 'transparent',
                            },
                        }}
                    />
                    <Stack.Screen name="otp" component={OtpVerification} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}

const mapStateToProps = createStructuredSelector({
    appSettings: selectAppSettings, 
    isConnecting: selectConnectionStatus
});

export default connect(mapStateToProps)(Routes)