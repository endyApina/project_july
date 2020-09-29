import React from 'react'; 
import { View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import {toBecomeVendor, toPayments} from '../../../session';
import { useNavigation } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';

const list = [
  {
    title: 'Notification', 
    icon: 'av-timer'
  }, 
  {
    title: 'Settings', 
    icon: 'settings'
  }, 
  {
    title: 'Payments', 
    icon: 'credit-card'
  }, 
  {
    title: 'History', 
    icon: 'history'
  }, 
  {
    title: 'Support', 
    icon: 'chat'
  }, 
  {
    title: 'About', 
    icon: 'info'
  },
]

const SettingsList = () => {
  const navigation = useNavigation();

  const handleItemClick = (val) => {
    var title = val.title 
  
    if (title === "Become a Vendor") {
      toBecomeVendor(navigation)
    }

    if (title === "Payments") {
      toPayments(navigation)
    }
  
    alert(val.title)
  }

  return (
    <View> 
      {
        list.map((item, i) => (
          <ListItem 
            key={i} 
            bottomDivider 
            onPress={() => handleItemClick(item)}
            containerStyle={{
              backgroundColor: 'transparent',
            }}
          >
            <Icon name={item.icon}/>
            <ListItem.Content>
              <ListItem.Title
                style={{
                  fontSize: 15,
                }}
              >
                {item.title}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color='black' />
          </ListItem>
        ))
      }

      <ListItem
        bottomDivider
        containerStyle={{
          marginTop: 60,
          backgroundColor: 'transparent',
        }}
      >
        <Icon name={'history'} />
        <ListItem.Content>
          <ListItem.Title>
            {"Become a Vendor"}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron color='black' />
      </ListItem>

      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: 'transparent',
        }}
      >
        <SimpleLineIcons name="logout" size={24} color="red" />
        <ListItem.Content>
          <ListItem.Title>
            {"Logout"}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron color='black' />
      </ListItem>
    </View>
  )
}

export default React.memo(SettingsList)