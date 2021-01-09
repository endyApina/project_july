import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../../screens/Login/Login.screen';
import RegistrationScreen from '../../screens/Registration/Registration.screen';
import ForgotPasswordScreen from '../../screens/ForgotPassword/forgot.screen';
import Landing from '../../screens/Landing/index';
import OtpVerification from '../../screens/otp/otpverification';
import AppSlider from '../../screens/AppIntroSlider/index'; 
import StationScreen from '../../screens/station/station.sreen';
import ConfirmRequestScreen from '../../screens/ConfirmRequest/confirm-request.screen';
import Success from '../../screens/SuccessScreen/success.component';
import OrderScreen from '../../components/station/station-order/order.component';
import BecomeVendorScreen from '../../screens/vendor/BecomeVendor/vendor.screen';
import PaymentScreen from '../../screens/Payments/payment.screen';
import AddCardScreen from '../../screens/Payments/AddCard/addcard.screen';
import NotificationScreen from '../../screens/Notifications/notifications.screen'

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
      <Stack.Screen 
        name="Landing" 
        component={Landing} 
        options={{
          title: '', 
          headerShown: false,
          headerStyle: {
            backgroundColor: '#dbdbdb',
          }
        }} 
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{title: 'Forgot Password'}} />
      <Stack.Screen name="Create Order" component={StationScreen} options={{title: 'Station'}} />
      <Stack.Screen name="Confirm Request" component={ConfirmRequestScreen} options={{title: 'Confirm Request'}} />
      <Stack.Screen name="Place_Order" component={OrderScreen} options={{title: 'Place Order'}} />
      <Stack.Screen name="Success" component={Success} options={{title: 'Success'}} />
      <Stack.Screen name="Payments" component={PaymentScreen} options={{title: 'Payments'}} />
      <Stack.Screen name="Add Card" component={AddCardScreen} options={{title: 'Add Card'}} />
      <Stack.Screen name="Become a Vendor" component={BecomeVendorScreen} options={{title: 'Become A Vendor'}} />
      <Stack.Screen name="Notifications" component={NotificationScreen} options={{title: 'Notification'}} />
      <Stack.Screen 
          name="AppSlider" 
          component={AppSlider} 
          options={{
              headerStyle: {
                  backgroundColor: '#0853f0',
              },
          }}
      />
      <Stack.Screen name="otp" component={OtpVerification} />
    </Stack.Navigator>
  )
}

export default MainNavigation