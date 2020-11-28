import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { selectAppSettings } from "../../redux/settings/settings.selector";
import { createStructuredSelector } from "reselect";
import ProfileSettingsHead from './Header/header';
import {  ProfileViewContainer, SettingsHeadContainer } from './style';
import ProfileForm from './Form/form';

const ProfileScreen = ({appSettings}) => {
  return(
    <ProfileViewContainer> 
      <SettingsHeadContainer> 
        <ProfileSettingsHead />
        <ProfileForm />
      </SettingsHeadContainer>
    </ProfileViewContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings
})

export default connect(mapStateToProps)(ProfileScreen)