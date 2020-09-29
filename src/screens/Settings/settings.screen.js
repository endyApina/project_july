import React from 'react'; 
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { createStructuredSelector } from 'reselect';
import { Avatar } from 'react-native-elements';
import { SettingsContainer, AvatarContainer, HelloText, EmailTextContainer, HelloContainer } from './settings.styles';
import Settings from '../../components/settings/settings.component';

const HelloComponent = () => {
  return (
    <HelloContainer>
      <HelloText>
        {"Hello,"}
      </HelloText>
    </HelloContainer>
  )
}

const SettingsScreen = ({appSettings}) => {
  return (
    <SettingsContainer> 
      <HelloComponent />
      <Settings />
    </SettingsContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings
})

export default connect(mapStateToProps)(SettingsScreen)