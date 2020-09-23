import React from 'react'; 
import { connect } from 'react-redux';
import {Divider} from 'react-native-paper';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { createStructuredSelector } from 'reselect';
import {ProfileHeaderContainer, SettingsViewContainer, SettingsContainer} from './settings.styles';
import ProfileHead from './profileHead/profile-head.component';
import SettingsList from './settings-list/list.component';

const Settings = ({appSettings}) => {
  return (
    <SettingsViewContainer>
      <ProfileHeaderContainer> 
        <ProfileHead />
      </ProfileHeaderContainer>
      <Divider />
      <SettingsContainer>
        <SettingsList />
      </SettingsContainer>
    </SettingsViewContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings
})

export default connect(mapStateToProps)(Settings)