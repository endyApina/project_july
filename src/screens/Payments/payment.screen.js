import React, {useState} from 'react';
import { connect } from 'react-redux'
import { PaymentScreenContainer, PaymentFloatRight, FloatRight, CashFloatRight, PaymentSmallTextContainer, PaymentSmallTexts, DistanceDetailsContainer, PaymentDiscountText, PromotionContainer, SmallerText, ScreenContainer, CashText, PaymentText, VISANumber, VISAContainer, PaymentMethod, CardContainer, CardText } from './payment.style';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { createStructuredSelector } from 'reselect';
import { Divider } from 'react-native-paper';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';
import { toAddCard, toPayments } from '../../session';
import { useNavigation } from '@react-navigation/native';

const CardSection = ({}) => {
  return (
    <CardContainer>
      <VISAContainer>
        <FontAwesome name="cc-visa" size={30} color="blue" />
      </VISAContainer>
      <CardText> 
        {'\u2B24'}
        {'\u2B24'}
        {'\u2B24'}
        {'\u2B24'}
      </CardText>
      <VISANumber>
        {"4567"}
      </VISANumber>
      <FloatRight>
        <CheckBox
          disabled={false}
          value={true}
          onFillColor={'blue'}
          onTintColor={'white'}
          onCheckColor={'white'}
        />
      </FloatRight>
    </CardContainer>
  )
}

const CashSection = ({}) => {
  return (
    <CardContainer>
      <VISAContainer>
        <Ionicons name="ios-cash" size={42} color="grey" />
      </VISAContainer>
      <CashText>
        {"Cash"}
      </CashText>
      <CashFloatRight>
        <CheckBox
          disabled={false}
          value={false}
          onFillColor={'blue'}
          onTintColor={'white'}
          onCheckColor={'white'}
        />
      </CashFloatRight>
    </CardContainer>
  )
}

const SmallestText = ({body}) => {
  return (
    <SmallerText>
      {body}
    </SmallerText>
  )
}

const DiscountDetails = () => {
  return (
    <DistanceDetailsContainer>
      <PaymentDiscountText> 
        {"10% discount"}
      </PaymentDiscountText>
      <PaymentSmallTextContainer>
        <PaymentSmallTexts>
          {"Valid for 2 refills"}
        </PaymentSmallTexts>
        <PaymentSmallTexts>
          {"Maximum value N350"}
        </PaymentSmallTexts>
        <PaymentSmallTexts>
          {"Expires 17.09.20"}
        </PaymentSmallTexts>
      </PaymentSmallTextContainer>
    </DistanceDetailsContainer>
  )
}

const PromotionSection = () => {
  return (
    <PromotionContainer>
      <CardContainer>
        <DiscountDetails />
        <PaymentFloatRight>
          <CheckBox
            disabled={false}
            value={true}
            onFillColor={'#d29f0e'}
            onTintColor={'#d29f0e'}
            onCheckColor={'white'}
          />
        </PaymentFloatRight>
      </CardContainer>
    </PromotionContainer>
  )
}

const PaymentScreen = ({}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const navigation = useNavigation();

  const navigateToAddCard = () => {
    toAddCard(navigation)
    // alert("Hyeio")
  }

  const PaymentCardSection = () => {
    return (
      <CardContainer 
      onStartShouldSetResponder={navigateToAddCard}
      >
        <VISAContainer>
         <AntDesign name="plus" size={24} color="black" />
        </VISAContainer>
        <PaymentText>
          {"Add Payment Card"}
        </PaymentText>
      </CardContainer>
    )
  }

  return (
    <PaymentScreenContainer>
      <ScreenContainer>
        <SmallestText body={"Payments"} />
        <PaymentMethod>
          {"Payment Methods"}
        </PaymentMethod>
        <Divider />
        <CardSection />
        <Divider />
        <CashSection />
        <Divider />
        <PaymentCardSection />
        <Divider />
        <SmallestText body={"Promotions"} />
        <Divider />
        <PromotionSection />
      </ScreenContainer>
    </PaymentScreenContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings
})

export default connect (mapStateToProps)(PaymentScreen)