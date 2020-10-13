import React from 'react'; 
import { NotificationScreenContainer, SomeText } from './notifications.style';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { ListItem } from 'react-native-elements';
import { SafeAreaView, ScrollView } from 'react-native';

const allNotifications = [
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
]

const NotificationScreen = ({}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <NotificationScreenContainer>
          {
            allNotifications.map((item, i) => (
              <ListItem
                key= {i}
                containerStyle={{
                  // backgroundColor: '#002feb',
                  borderTopLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  borderTopRightRadius: 15,
                  height: 110,
                  marginTop: 10,
                }}
              > 
                <ListItem.Content> 
                  <ListItem.Title 
                    right
                    style={{
                      fontSize: 16,
                      paddingBottom: 5,
                    }}
                  > 
                    {item.name}
                  </ListItem.Title>
                  <ListItem.Subtitle
                    style={{
                      fontSize: 11
                    }}
                  > 
                  {item.order_description}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle
                    style={{
                      marginTop: 10,
                      paddingTop: 10,
                      fontSize: 11
                    }}
                  > 
                  {item.date}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ))
          }
        </NotificationScreenContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateTopProps = createStructuredSelector({
  appSettings: selectAppSettings, 
})

export default connect(mapStateTopProps)(NotificationScreen)