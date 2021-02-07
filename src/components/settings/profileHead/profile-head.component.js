import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react'; 
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import { selectAppUserData } from '../../../redux/user/user.selector';
import { ProfileHeadContainer } from './profile-head.styles';

const AvatarElement = () => {
  return (
    <Avatar
      source={{uri: 'https://randomuser.me/api/portraits/men/42.jpg'}}
      size='medium'
      rounded
    />
  )
}

const ProfileHead = ({appSettings, appUserData}) => {
  const [userData, updateUserData] = useState('')
  const [fullName, updateName] = useState('')
  const getAppData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user_data')
      const respData = JSON.parse(jsonValue)
      if (respData != null) {
        updateUserData(respData)
        updateName(respData.user_data.full_name)
      }
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }
  // getAppData()

  useEffect(() => {
    getAppData()
  }, [])

  const {AppMainColor} = appSettings;
  return (
    <ProfileHeadContainer> 
      <ListItem
        containerStyle={{
          backgroundColor: AppMainColor,
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
            {fullName}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </ProfileHeadContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings, 
  appUserData: selectAppUserData,
})

export default connect(mapStateToProps)(ProfileHead)