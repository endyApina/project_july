import React from 'react'; 
import { connect } from 'react-redux'; 
import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import ImageHeader from '../../../components/station/gas-image-header/image-header.componenet';
import { WayTextContainer, HomeButtonContainer, DirectionsContainer, WayText } from './styles';
import CustomButton from '../../../components/forms/custom-button/custom-button.component'; 
import ButtonText from '../../../components/forms/button-text/button-text.component';
import {useNavigation} from '@react-navigation/native';

const OrderDetailsScreen = ({appSettings}) => {
  const navigation = useNavigation();
  const backToHome = () => {
    navigation.reset({
      index: 0, 
      routes: [{name: 'Landing'}]
    })
  }

  const { transparentBorder, boxShadow, buttonTextColor, defaultButtonBackgroundColor, defaultButtonWidth, inputRadius, defaultInputWidth, defaultInputPlaceholderColor, defaultInputBgColor, defaultInputTextColor} = appSettings;
  return (
    <SafeAreaView> 
      <ScrollView> 
        <View> 
          <ImageHeader />
        </View>
        <View 
          style={{
            flex: 1, 
            alignItems: 'center',
            justifyContent: 'center', 
            // backgroundColor: 'blue'
          }}
        >
          <WayTextContainer>
            <WayText>
              {"Your Order from Romeo Gas Station is on its way"}
            </WayText>
          </WayTextContainer>
          <DirectionsContainer>
            <Image 
              source={require('../../../../assets/road.png')}
              style={{
                width: 100, 
                height: 100
              }}
            /> 
          </DirectionsContainer>
          <HomeButtonContainer>
          <CustomButton 
            onPress={backToHome} 
            // loading={submissionLoader}
            space={'20px'} 
            uppercase={'true'} 
            width={'330px'} 
            color={buttonTextColor} 
            bgcolor={defaultButtonBackgroundColor} 
            box-shadow={boxShadow}
            radius={'10px'}
            // disabled={disableButton}
          >
            <ButtonText weight={'bold'}>{'Back to Home'}</ButtonText>
          </CustomButton>  
          </HomeButtonContainer>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings, 
})

export default connect(mapStateToProps)(OrderDetailsScreen)