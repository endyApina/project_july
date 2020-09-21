import React from 'react'; 
import { connect } from 'react-redux';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { createStructuredSelector } from 'reselect';
import {ProfileHeaderContainer} from './settings.styles';
import ProfileHead from './profileHead/profile-head.component';

const Settings = ({appSettings}) => {
  return (
    <ProfileHeaderContainer> 
      <ProfileHead />
    </ProfileHeaderContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings
})

export default connect(mapStateToProps)(Settings)