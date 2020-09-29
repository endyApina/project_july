import * as React from 'react';
import { View, Text, Image } from 'react-native';
import Maps from '../../components/maps/map.component'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Feather, Entypo } from '@expo/vector-icons';
import SettingsScreen from '../Settings/settings.screen';
import { Avatar, Badge } from 'react-native-elements';
// import { Badge, Avatar } from 'react-native-paper';

function Notifications() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications!</Text>
      </View>
    );
  }

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

      <Badge
        status="success"
        containerStyle={{position: 'absolute', top: -4, right: -4}}
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
                name="Home"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Home', 
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
              name="Maps"
              component={Maps}
              options={{
                tabBarLabel: 'Maps',
                tabBarIcon: ({ color }) => (
                  <Feather name="map-pin" size={26} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={Notifications}
              options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                  <UserProfileBottomIcon />
                ),
              }}
            />
        </Tab.Navigator>
    )
}

export default Landing;