import React from 'react'; 
import { View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import {toBecomeVendor} from '../../../session';
import { useNavigation } from '@react-navigation/native';

const list = [
  {
    title: 'Become a Vendor', 
    icon: 'av-timer'
  }, 
  {
    title: 'Trips', 
    icon: 'flight-takeoff'
  },
]

const SettingsList = () => {
  const navigation = useNavigation();

  const handleItemClick = (val) => {
    var title = val.title 
  
    if (title === "Become a Vendor") {
      toBecomeVendor(navigation)
    }
  
    alert(val.title)
  }

  return (
    <View> 
      {
        list.map((item, i) => (
          <ListItem key={i} bottomDivider onPress={() => handleItemClick(item)}>
            <Icon name={item.icon} />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))
      }
    </View>
  )
}

export default React.memo(SettingsList)