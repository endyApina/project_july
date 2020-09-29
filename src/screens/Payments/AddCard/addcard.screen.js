import React from 'react'; 
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import { createStructuredSelector } from 'reselect';
import { HeaderContainer, VISAContainer, AddCardContainer, CVVContainer, ExpireContainer, CardText, AddCardRowContainer, HeaderText, CardContainer } from './addcard.styles';
import { Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from '../../../components/forms/custom-button/custom-button.component';
import ButtonText from '../../../components/forms/button-text/button-text.component';
import CustomInput from '../../../components/forms/custom-input/custom-input.component';

const CardNumberSection = () => {
  return (
    <AddCardRowContainer>
      <CardText>
        {"CARD NUMBER"}
      </CardText>
      <CardContainer>
        <CustomInput 
            // onChangeText={}
            // value={password}
            placeholder={'1234   5678   9087   7654'}
            bgcolor={'#e0e0e0'}
            placeholderTextColor={'#4a4a4a'} 
            width={'250px'} 
            radius={'1px'}
            txtcolor={'#4a4a4a'} 
        />
        <VISAContainer>
          <FontAwesome name="cc-visa" size={30} color="blue" />
        </VISAContainer>
      </CardContainer>
    </AddCardRowContainer>
  )
}

const CardHolderSection = () => {
  return (
    <AddCardRowContainer>
      <CardText>
        {"CARDHOLDER NAME"}
      </CardText>
      <CardContainer>
        <CustomInput 
          // onChangeText={}
          // value={password}
          placeholder={'John Doe'}
          bgcolor={'#e0e0e0'}
          placeholderTextColor={'#4a4a4a'} 
          width={'370px'} 
          radius={'1px'}
          txtcolor={'#4a4a4a'} 
        />
      </CardContainer>
    </AddCardRowContainer>
  )
}

const ExpireDate = () => {
  return (
    <ExpireContainer>
      <CardText>
        {"EXPIRE DATE"}
      </CardText>
        <CustomInput 
          // onChangeText={}
          // value={password}
          placeholder={'05  /  21'}
          bgcolor={'#e0e0e0'}
          placeholderTextColor={'#4a4a4a'} 
          width={'120px'} 
          radius={'1px'}
          txtcolor={'#4a4a4a'} 
        />
    </ExpireContainer>
  )
}

const CVV = () => {
  return (
    <CVVContainer>
      <CardText>
        {"CVV"}
      </CardText>
      <CustomInput 
        // onChangeText={}
        // value={password}
        placeholder={'123'}
        bgcolor={'#e0e0e0'}
        placeholderTextColor={'#4a4a4a'} 
        width={'70px'} 
        radius={'1px'}
        txtcolor={'#4a4a4a'} 
      />
    </CVVContainer>
  )
}

const ExpireCVVSection = () => {
  return (
    <AddCardRowContainer>
      <CardContainer>
        <ExpireDate />
        <CVV />
      </CardContainer>
    </AddCardRowContainer>
  )
}

const HeaderSection = () => {
  return (
    <HeaderContainer>
      <Image 
        source={require('../../../../assets/mastercard.png')} 
        style={{width: 300, height: 100}} 
      />
      <HeaderText>
        {"Add your card for seamless payments. We may do a temporary booking to validate your card, but hey, we'll send it right back."}
      </HeaderText>
    </HeaderContainer>
  )
}

const AddCardButton = () => {
  return (
    <AddCardContainer>
      <CustomButton 
        // onPress={handleSubmit} 
        // loading={isSubmitting}
        space={'2px'} 
        uppercase={'true'} 
        width={'300px'} 
        color={'white'} 
        bgcolor={'blue'} 
        // box-shadow={}
        radius={'10px'}
        >
            <ButtonText weight={'bold'}>{'ADD CARD'}</ButtonText>
        </CustomButton>
    </AddCardContainer>
  )
}

const AddCardScreen = () => {
  return (
    <>
      <HeaderSection />
      <CardNumberSection />
      <CardHolderSection />
      <ExpireCVVSection />
      <AddCardButton />
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings
})

export default connect(mapStateToProps)(AddCardScreen)