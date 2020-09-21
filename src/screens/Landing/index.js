import * as React from 'react';
import { View, Text, Image } from 'react-native';
import Maps from '../../components/maps/map.component'; 
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, Feather, Entypo } from '@expo/vector-icons';
import SettingsScreen from '../Settings/settings.screen';

function Notifications() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications!</Text>
      </View>
    );
  }

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

const Landing = ({}) => {
    return (
        <Tab.Navigator
            initialRouteName="Maps"
            activeColor="#ed1f27"
            labelStyle={{fontSize: 12}}
            style={{ backgroundColor: 'tomato' }}
            barStyle={{backgroundColor: '#f0f0f0'}}
        >
            <Tab.Screen 
                name="Maps"
                component={Maps}
                options={{
                    tabBarLabel: 'Home', 
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
              name="Notifications"
              component={Notifications}
              options={{
                tabBarLabel: 'Notifications',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="bell" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({ color }) => (
                  <Feather name="settings" size={26} color={color} />
                ),
              }}
            />
        </Tab.Navigator>
    )
}

export default Landing;