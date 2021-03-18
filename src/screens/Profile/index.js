import React from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { selectAppSettings } from "../../redux/settings/settings.selector";
import { createStructuredSelector } from "reselect";
import ProfileSettingsHead from './Header/header';
import {  ProfileViewContainer, SettingsHeadContainer } from './style';
import ProfileForm from './Form/form';

const ProfileScreen = ({appSettings}) => {
  return(
    <ScrollView> 
      <ProfileViewContainer> 
        <SettingsHeadContainer> 
          <ProfileSettingsHead />
          <ProfileForm />
        </SettingsHeadContainer>
      </ProfileViewContainer>
    </ScrollView>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings
})

export default connect(mapStateToProps)(ProfileScreen)