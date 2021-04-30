import React from 'react'; 
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import { FullNameContainer, NameText } from '../welcometext/styles';

const FullNameText = ({name}) => {
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
    <FullNameContainer> 
      <NameText> 
        {weather}
      </NameText>
      <NameText>
        {name}
      </NameText>
    </FullNameContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings, 
})

export default connect(mapStateToProps)(FullNameText)