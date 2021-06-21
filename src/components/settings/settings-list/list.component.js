import React from 'react'; 
import { View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import {toBecomeVendor, toOrders, toNotification, toPayments, toLogin} from '../../../session';
import { useNavigation } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { userLogOut } from '../../../config';

const list = [
  // {
  //   title: 'Notifications', 
  //   icon: 'av-timer'
  // }, 
  {
    title: 'My Orders', 
    icon: 'history'
  }, 
  {
    title: 'Bulk Order', 
    icon: 'group'
  },
  {
    title: 'Payments', 
    icon: 'credit-card'
  }, 
  // {
  //   title: 'History', 
  //   icon: 'settings'
  // }, 
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

    if (title === "Notifications") {
      toNotification(navigation)
    }

    if (title === "My Orders") {
      toOrders(navigation)
    }

    if (title === "Bulk Order") {
      alert("Contact support via email: info@gas2go.com or Tel: +234872311349")
    }
  
    // alert(val.title)
  }

  const handleSignOut = () => {
    userLogOut()
    toLogin(navigation)
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
            underlayColor="#c4c4c4"
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
          // marginTop: 60,
          backgroundColor: 'transparent',
        }}
        underlayColor="#c4c4c4"
      >
        <Icon name={'history'} />
        <ListItem.Content>
          <ListItem.Title>
            {"Join Gas to go club"}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron color='black' />
      </ListItem>

      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: 'transparent',
        }}
        underlayColor="#c4c4c4"
        onPress={handleSignOut}
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