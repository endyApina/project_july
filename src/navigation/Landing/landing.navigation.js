import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../../screens/Login/Login.screen';
import RegistrationScreen from '../../screens/Login/Login.screen';
import ForgotPasswordScreen from '../../screens/ForgotPassword/forgot.screen';
import Landing from '../../screens/Landing/index';
import OtpVerification from '../../screens/otp/otpverification';
import AppSlider from '../../screens/AppIntroSlider/index'

const Stack = createStackNavigator()

const MainNavigation = () => {
  return (
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
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="Registration" component={RegistrationScreen} options={{ title: 'Sign Up' }} />
      <Stack.Screen name="Landing" component={Landing} options={{title: 'Landing'}} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{title: 'Forgot Password'}} />
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
  )
}

export default MainNavigation