import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import { ProfileSettingsHeadContainer } from './style';
import { ListItem, Avatar } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';

const AvatarElement = () => {
  return (
    <Avatar 
      source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}
      size='xlarge'
      rounded
      containerStyle={{
        marginBottom: 100, 
      }}
      avatarStyle={{
        borderWidth: 2, 
        borderColor: 'white', 
      }}
    />
  )
}

const ProfileSettingsHead = ({appSettings}) => {
  const {AppMainColor} = appSettings;
  return (
    <ProfileSettingsHeadContainer> 
      <ListItem
        containerStyle={{
          backgroundColor: AppMainColor, 
          borderTopLeftRadius: 15,
          borderBottomRightRadius: 15, 
          borderTopRightRadius: 15, 
          height: 100, 
        }}
      > 
        <AvatarElement />
        <ListItem.Content> 

        </ListItem.Content>
        {/* <ListItem.Chevron/> */}
      </ListItem>
    </ProfileSettingsHeadContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings, 
})

export default connect(mapStateToProps)(ProfileSettingsHead)