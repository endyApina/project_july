import React from 'react'; 
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { createStructuredSelector } from 'reselect';
import { Avatar } from 'react-native-elements';
import { SettingsContainer, AvatarContainer, EmailTextContainer } from './settings.styles';
import Settings from '../../components/settings/settings.component';

const SettingsScreen = ({appSettings}) => {
  return (
    <SettingsContainer> 
      <Settings />
    </SettingsContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings
})

export default connect(mapStateToProps)(SettingsScreen)