import * as React from 'react'
import { Text } from 'react-native-elements';
import { View, Image, SafeAreaView, ScrollView } from 'react-native';
import { ImageContainer, StationContainer } from './station.styles';
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
          {/* <ImageHeader /> */}
          <ImageContainer> 
            <Image 
              source={require("../../../assets/gas-station.png")}
              style={{
                height: 200, 
                width: 200
              }}
            />
          </ImageContainer>
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