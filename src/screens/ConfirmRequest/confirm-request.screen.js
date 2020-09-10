import React from 'react'; 
import { View, Switch } from 'react-native'; 
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { createStructuredSelector } from 'reselect';
import { Avatar, CustomButtonController, BoldWeightText, ViewContainer, VISAContainer, CardText, ViewContainerRow, BoldNormalText, SmallHeaderText, NormalText } from './confirm-request.styles';
import { Fontisto } from '@expo/vector-icons';
import CustomButton from '../../components/forms/custom-button/custom-button.component';
import ButtonText from '../../components/forms/button-text/button-text.component';
import { toSuccess } from '../../session';

const VendorRow = () => {
  return (
    <ViewContainer>
      <SmallHeaderText>
        {"Vendor"}
      </SmallHeaderText>
      <NormalText>
        {"Forte Gas Station"}
      </NormalText>
    </ViewContainer>
  )
}

const AddressRow = () => {
  return (
    <ViewContainer> 
      <SmallHeaderText>
        {"Address:"}
      </SmallHeaderText>
      <NormalText>
        {"12 Silver Street, Shomolu, Lagos."}
      </NormalText>
    </ViewContainer>
  )
}

const WeightRow = () => {
  return (
    <ViewContainerRow>
      <NormalText> 
        {"Weight (Kg): "}
      </NormalText>
      <BoldWeightText> 
        {"12.5kg"}
      </BoldWeightText>
    </ViewContainerRow>
  )
}

const PriceRow = () => {
  return (
    <ViewContainerRow> 
      <NormalText>{"Price"}</NormalText>
      <BoldNormalText>{"N 4,750"}</BoldNormalText>
    </ViewContainerRow>
  )
}

const CardRow = () => {
  return (
    <ViewContainerRow> 
      <CardText> 
        {'\u2B24'}
        {'\u2B24'}
        {'\u2B24'}
        {'\u2B24'}
      </CardText>
      <NormalText>
        {" - 4467"}
      </NormalText>
      <VISAContainer>
        <Fontisto name="visa" size={35} color="#0016db" />
      </VISAContainer>
    </ViewContainerRow>
  )
}

const PickupRow = () => {
  return (
    <ViewContainerRow> 
      <NormalText>{"Pickup"}</NormalText>
      <VISAContainer>
        <Switch style={{marginLeft: 40}} />
      </VISAContainer>
    </ViewContainerRow>
  )
}

const ConfirmRequestScreen = ({appSettings}) => {
  const { transparentBorder, boxShadow, buttonTextColor, defaultButtonBackgroundColor, defaultButtonWidth, inputRadius, defaultInputWidth, defaultInputPlaceholderColor, defaultInputBgColor, defaultInputTextColor} = appSettings;
  const navigation = useNavigation();

  const handleConfirmRequest = () => {
    toSuccess(navigation)
  }

  return (
    <View>
      <Avatar source={require('../../../assets/gas-station.png')} />
      <VendorRow />
      <Divider />
      <AddressRow />
      <Divider />
      <WeightRow />
      <Divider />
      <PriceRow />
      <Divider />
      <CardRow />
      <Divider />
      <PickupRow />
      <Divider />
      <CustomButtonController> 
        <CustomButton 
          onPress={handleConfirmRequest} 
          loading={false}
          space={'20px'} 
          uppercase={'true'} 
          width={'330px'} 
          color={buttonTextColor} 
          bgcolor={defaultButtonBackgroundColor} 
          box-shadow={boxShadow}
          radius={'10px'}
        >
          <ButtonText weight={'bold'}>{'Confirm'}</ButtonText>
        </CustomButton> 
      </CustomButtonController>
    </View>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings
})

export default connect(mapStateToProps)(ConfirmRequestScreen)