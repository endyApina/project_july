import * as React from 'react';
import { View, Text, Image } from 'react-native';
import Maps from '../../components/maps/map.component'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Feather, Entypo } from '@expo/vector-icons';
import SettingsScreen from '../Settings/settings.screen';
import { Avatar, Badge } from 'react-native-elements';
// import { Badge, Avatar } from 'react-native-paper';
import ProfileScreen from '../Profile/';
import Dashboard from '../Dashboard';

function UserProfileBottomIcon() {
  return (
    <View>
      <Avatar 
        rounded
        source={{
          uri: 'https://randomuser.me/api/portraits/men/41.jpg',
        }}
        size="small"
      />
    </View>
  )
}

const Tab = createBottomTabNavigator();

const Landing = ({}) => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
        >
            <Tab.Screen 
                name="Tools"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Tools', 
                    tabBarIcon: ({ color }) => (
                      <Feather name="map-pin" size={26} color={color} />
                    ),
                }}
            />
            <Tab.Screen
              name="Home"
              component={Dashboard}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }}
            />
            {/* <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                  // <UserProfileBottomIcon />
                  <Feather name="user" size={26} color={color} />
                ),
              }}
            /> */}
        </Tab.Navigator>
    )
}

export default Landing;