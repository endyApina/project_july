/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, {} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './src/screens/Login/Login.screen';
import RegistrationScreen from './src/screens/Registration/Registration.screen';

const Stack = createStackNavigator();

const Routes = ({}) => {
    const theme = {
        ...DefaultTheme, 
        colors: {
            primary: 'red', 
            accent: 'white',
        },
    };

    return (
        <PaperProvider
            theme={theme}
            setting={{
                icon: props => <Ionicons {...props} />,
            }}
        >
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
						headerStyle: {
							backgroundColor: '#c9d4cc',
						},
						headerTintColor: 'blue',
						headerTitleStyle: {
							fontWeight: 'bold',
							color: 'transparent',
						},
					}}
					initialRouteName="Login"
                >
                    <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
                    <Stack.Screen name="Registration" component={RegistrationScreen} options={{ title: 'Sign Up' }} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}

export default Routes