import * as React from 'react'; 
import { SafeAreaView, ScrollView } from 'react-native';
import { BodyContainer, ImageContainer, OrderContainer } from './order.styles';
import { createStructuredSelector } from 'reselect';
import { Divider } from 'react-native-paper';
import { connect } from 'react-redux';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import ImageHeader from '../../../components/station/gas-image-header/image-header.componenet';
import { useNavigation } from '@react-navigation/native';
import BottomSheetComponent from '../bottom-sheet-content/bottom-sheet.content';

const OrderScreen = ({appSettings}) => {
  const {mainColor, defaultColor, backgroundColor} = appSettings;
  return (
    <OrderContainer bgcolor={backgroundColor}>
      <ImageContainer>
        <ImageHeader />
      </ImageContainer>
      <Divider />
      <BodyContainer>
        <BottomSheetComponent />
      </BodyContainer>
    </OrderContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings, 
})

export default connect(mapStateToProps)(OrderScreen)