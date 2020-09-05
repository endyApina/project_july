import * as React from 'react'; 
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import { connect } from 'react-redux';
import ButtonText from '../../forms/button-text/button-text.component';
import { View, Text } from 'react-native'; 
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';
import { ContentContainer, AboutText, TimeText, DaysText, RatingIconContainer, RatingText, RatingContainer, KGContainer, KGText, PricingText, LineContainer, LocationContatainer } from './content.styles';
import CustomButton from '../../forms/custom-button/custom-button.component';

const Location = () => {
  return (
    <LocationContatainer> 
      <Entypo name="location-pin" size={18} color="black" />
      <Text
        style={{
          // paddingLeft: '15',
        }}
      >
        {"285 Lekki-Epe Express Way Lekki."}
      </Text>
    </LocationContatainer>
  )
}

const Pricing = () => {
  return (
    <LineContainer> 
      <PricingText> 
        {"Pricing: "}
      </PricingText>
      <KGContainer>
        <KGText>
          {"N 275 / kg"} 
        </KGText>
      </KGContainer>
    </LineContainer>
  )
}

const Ratings = () => {
  return (
    <RatingContainer> 
      <RatingText> 
        {"Rating"}
      </RatingText>
      <RatingIconContainer>
        <FontAwesome name="star" size={24} color="#FFD700" />
        <FontAwesome name="star" size={24} color="#FFD700" />
        <FontAwesome name="star" size={24} color="#FFD700" />
        <FontAwesome name="star" size={24} color="#FFD700" />
        <FontAwesome name="star-half-full" size={24} color="#FFD700" />
      </RatingIconContainer>
    </RatingContainer>
  )
}

const WorkHours = () => {
  return (
    <RatingContainer>
      <RatingText>
        {"Work Hours"}
      </RatingText>
      <RatingIconContainer> 
        <DaysText>
          {"Monday - Sunday: "}
        </DaysText>
        <TimeText>
          {"08:00AM - 08:00PM"}
        </TimeText>
      </RatingIconContainer>
    </RatingContainer>
  )
}

const Description = () => {
  return (
    <RatingContainer>
      <AboutText>
        {"Dramatically evisculate multidisciplinary niche markets and revolutionary expertise. Enthusiastically extend goal-oriented results for enabled e-markets. Monotonectally facilitate worldwide sources without 2.0 users. Continually enhance team."}
      </AboutText>
    </RatingContainer>
  )
}

const StationContent = ({appSettings}) => {
  const { transparentBorder, boxShadow, buttonTextColor, defaultButtonBackgroundColor, defaultButtonWidth, inputRadius, defaultInputWidth, defaultInputPlaceholderColor, defaultInputBgColor, defaultInputTextColor} = appSettings;
  return (
    <ContentContainer> 
      <Location />
      <Divider />
      <Pricing />
      <Divider />
      <Ratings />
      <Divider />
      <WorkHours />
      <Divider />
      <Description />
      <CustomButton 
        onPress={() => ({})} 
        loading={false}
        space={'20px'} 
        uppercase={'true'} 
        width={'330px'} 
        color={buttonTextColor} 
        bgcolor={defaultButtonBackgroundColor} 
        box-shadow={boxShadow}
        radius={'10px'}
      >
        <ButtonText weight={'bold'}>{'Place Order'}</ButtonText>
      </CustomButton>
    </ContentContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings, 
})

export default connect(mapStateToProps)(StationContent)