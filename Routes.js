/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, {} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/Login/Login.screen';
import RegistrationScreen from './src/screens/Registration/Registration.screen';
import ForgotPasswordScreen from './src/screens/ForgotPassword/forgot.screen';
import Landing from './src/screens/Landing/index';
import OtpVerification from './src/screens/otp/otpverification';
import AppSlider from './src/screens/AppIntroSlider/index'; 
import StationScreen from './src/screens/station/station.sreen';
import ConfirmRequestScreen from './src/screens/ConfirmRequest/confirm-request.screen';
import Success from './src/screens/SuccessScreen/success.component';
import OrderScreen from './src/components/station/station-order/order.component';
import BecomeVendorScreen from './src/screens/vendor/BecomeVendor/vendor.screen';
import PaymentScreen from './src/screens/Payments/payment.screen';
import AddCardScreen from './src/screens/Payments/AddCard/addcard.screen';
import NotificationScreen from './src/screens/Notifications/notifications.screen'; 
import OrderHistory from './src/screens/orders';
import GasOrderType from './src/screens/gastype';
import CancelOrderScreen from './src/screens/orders/cancel-order';

import { DefaultTheme, Provider as PaperProvider  } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { selectConnectionStatus } from './src/redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectAppSettings} from './src/redux/settings/settings.selector';
import Loader from './src/components/utility/loader/loader.component';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator()

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
							initialRouteName="Login"
						>
							<Stack.Screen name="Login" 
								component={LoginScreen} 
								options={{ 
									title: 'Login' , 
									headerShown: false
								}} 
							/>
							<Stack.Screen 
								name="Registration" 
								component={RegistrationScreen} 
								options={{ 
									title: 'Sign Up', 
									headerShown: false
								}} 
							/>
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
							<Stack.Screen name="Confirm Request" component={ConfirmRequestScreen} options={{title: 'Back'}} />
							<Stack.Screen name="Place_Order" component={OrderScreen} options={{title: 'Place Order'}} />
							<Stack.Screen name="Success" component={Success} options={{title: 'Success'}} />
							<Stack.Screen name="Payments" component={PaymentScreen} options={{title: 'Payments'}} />
							<Stack.Screen name="Add Card" component={AddCardScreen} options={{title: 'Add Card'}} />
							<Stack.Screen name="Become a Vendor" component={BecomeVendorScreen} options={{title: 'Become A Vendor'}} />
							<Stack.Screen name="Notifications" component={NotificationScreen} options={{title: 'Notification'}} />
							<Stack.Screen name="Orders" component={OrderHistory} options={{title: 'Orders'}} />
							<Stack.Screen name="GasOrderType" component={GasOrderType} options={{title: "Back"}} />
							<Stack.Screen name="Cancel Order" component={CancelOrderScreen} options={{title: "Back"}} />
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
					</NavigationContainer>
        </PaperProvider>
    )
}

const mapStateToProps = createStructuredSelector({
    appSettings: selectAppSettings, 
    isConnecting: selectConnectionStatus
});

export default connect(mapStateToProps)(Routes)