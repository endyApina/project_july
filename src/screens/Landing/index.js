import * as React from 'react';
import { View, Text, Image } from 'react-native';
import Maps from '../../components/maps/map.component'; 
// import VendorList from '../../components/maps/vendor-list/list.component';
import VendorList from '../../screens/Landing/nearby/nearby.sreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
            activeColor="#e91e63"
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
              name="Nearby"
              component={VendorList}
              options={{
                tabBarLabel: 'Nearby',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="bank" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Notifications"
              component={Notifications}
              options={{
                tabBarLabel: 'Updates',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="bell" color={color} size={26} />
                ),
              }}
            />
        </Tab.Navigator>
    )
}

export default Landing;