import React from 'react'; 
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import { ProfileHeadContainer } from './profile-head.styles';

const AvatarElement = () => {
  return (
    <Avatar
      source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}
      size='medium'
      rounded
    />
  )
}

const ProfileHead = ({}) => {
  return (
    <ProfileHeadContainer> 
      <ListItem
        containerStyle={{
          backgroundColor: '#002feb',
          borderTopLeftRadius: 15,
          borderBottomRightRadius: 15,
          borderTopRightRadius: 15,
          height: 90,
        }}
      > 
        <AvatarElement />
        <ListItem.Content> 
          <ListItem.Title 
            right
            style={{
              color: 'white',
              fontSize: 11,
              paddingBottom: 5,
            }}
          > 
            {"View profile"}
          </ListItem.Title>
          <ListItem.Subtitle
            style={{
              color: 'white',
            }}
          > 
            {"Endy Apinageri"}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </ProfileHeadContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings, 
})

export default connect(mapStateToProps)(ProfileHead)