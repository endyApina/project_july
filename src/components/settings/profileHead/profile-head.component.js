import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react'; 
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import { selectAppUserData } from '../../../redux/user/user.selector';
import { ProfileHeadContainer } from './profile-head.styles';
import { useNavigation } from '@react-navigation/native';
import { toGasOrderType } from '../../../session';

const AvatarElement = ({name}) => {
  return (
    <Avatar
      title={name}
      size='medium'
      rounded
      containerStyle={{
        backgroundColor: '#ffffff', 
      }}
      titleStyle={{
        color: '#000000'
      }}
    />
  )
}

const ProfileHead = ({appSettings, appUserData}) => {
  const navigation = useNavigation(); 
  const [userData, updateUserData] = useState('')
  const [fullName, updateName] = useState('')
  const [initials, setInitials] = useState('')

  const splittedName = fullName.split(" ")
  const firstIn = splittedName[0]
  const secondIn = splittedName[1]
  // const secondIn = splittedName[1].charAt(0)
  var inin; 
  if (firstIn && secondIn) {
    inin = firstIn.charAt(0) + secondIn.charAt(0)
  }

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
          borderTopLeftRadius: 25,
          borderBottomRightRadius: 25,
          borderTopRightRadius: 25,
          height: 90,
        }}
        underlayColor="white"
        onPress={() => {
          toGasOrderType(navigation)
        }}
      > 
        <AvatarElement name={inin} />
        <ListItem.Content> 
          <ListItem.Title 
            right
            style={{
              color: 'white',
              fontSize: 18,
              paddingBottom: 5,
            }}
          > 
            {"Order Gas Now!"}
          </ListItem.Title>
          {/* <ListItem.Subtitle
            style={{
              color: 'white',
            }}
          > 
            {fullName}
          </ListItem.Subtitle> */}
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