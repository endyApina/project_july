import React from 'react'; 
import { ListItem, Avatar } from 'react-native-elements';
import { View } from 'react-native';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import { List } from 'react-native-paper';

const AvatarElement = () => {
  return (
    <Avatar
      source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}
      size='large'
      rounded
    />
  )
}

const ProfileHead = ({}) => {
  return (
    <View> 
      <ListItem> 
        <AvatarElement />
        <ListItem.Content> 
          <ListItem.Title right> 
            {"Endy Apinageri"}
          </ListItem.Title>
          <ListItem.Subtitle> 
            {"apinaendy@gmail.com"}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings, 
})

export default connect(mapStateToProps)(ProfileHead)