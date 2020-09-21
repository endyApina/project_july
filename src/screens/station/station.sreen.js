import * as React from 'react'
import { Text } from 'react-native-elements';
import { View, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { StationContainer } from './station.styles';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import ImageHeader from '../../components/station/gas-image-header/image-header.componenet'; 
import StationContent from '../../components/station/content/content.component';

const StationScreen = ({appSettings}) => {
  const {mainColor, defaultColor, backgroundColor} = appSettings;
  return (
    <SafeAreaView>
      <ScrollView> 
        <StationContainer bgcolor={backgroundColor}>
          <ImageHeader />
          <StationContent />
        </StationContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings,
})

export default connect(mapStateToProps)(StationScreen)