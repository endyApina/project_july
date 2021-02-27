import React, {useState, useEffect} from 'react'; 
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { createStructuredSelector } from 'reselect';
import { Avatar } from 'react-native-elements';
import { SettingsContainer, AvatarContainer, HelloText, EmailTextContainer, HelloContainer } from './settings.styles';
import Settings from '../../components/settings/settings.component';
import { getUserData } from '../../config';

const HelloComponent = ({name}) => {
  if (name != "") {
    split = name.split(" ");
    name = split[0]
  }

  var weather = ""
  var today = new Date()
  var curHR = today.getHours()

  if (curHR < 12) {
    weather = "Good Morning, "
  } else if (curHR < 18) {
    weather = "Good Afternoon, "
  } else {
    weather = "Good Evening, "
  }

  return (
    <HelloContainer>
      <HelloText>
        {weather + name}
      </HelloText>
    </HelloContainer>
  )
}

const SettingsScreen = ({appSettings}) => {
  const [name, setName] = useState('');
  
  useEffect(() => {
    getUserData().then((res) => {
      setName(res.user_data.full_name)
    })
  }, [])

  return (
    <SettingsContainer> 
      <HelloComponent name={name}/>
      <Settings />
    </SettingsContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings
})

export default connect(mapStateToProps)(SettingsScreen)