import React, {useState, useEffect} from 'react'; 
import { SafeAreaView, ScrollView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import { createStructuredSelector } from 'reselect';
import { HeaderContainer, VISAContainer, AddCardContainer, CVVContainer, ExpireContainer, CardText, AddCardRowContainer, HeaderText, CardContainer } from './addcard.styles';
import { Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from '../../../components/forms/custom-button/custom-button.component';
import ButtonText from '../../../components/forms/button-text/button-text.component';
import CustomInput from '../../../components/forms/custom-input/custom-input.component';
import axios from 'axios';

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


const AddCardScreen = ({appSettings}) => {
  const { AppMainColor} = appSettings;
  const [cardDetails, updateCardDetails] = useState({
    cardNumber: "", 
    cardHolderName: "", 
    exp: "", 
    cvv: ""
  }) 
  const {cardNumber, cardHolderName, exp, cvv} = cardDetails;
  const [isSubmitting, toggleSubmitting] = useState(false);

  const callPay = async () => {
    console.log("callPau")
    // return fetch('https://api.paystack.co/transaction/initialize', {
    //   method: 'POST', 
    //   headers: {
    //     Authorization: 'Bearer sk_test_bff0bbb55f131f964d1d92150646f267d64a64ae', 
    //     'Content-Type': 'application/json'
    //   }, 
    //   body: JSON.stringify({
    //     email: "apinaendy@gmail.com", 
    //     amount: "4000"
    //   })
    // }).then((response) => response.json())
    // .then((json) => {
    //   console.log(json)
    // }).catch((error) => {
    //   console.log(error)
    // })
    return fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST', 
      headers: {
        Authorization: 'Bearer sk_test_bff0bbb55f131f964d1d92150646f267d64a64ae', 
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        "email": "customer@email.com",
        "amount": "10000",
        "metadata": {
          "custom_fields": [
            {
              "value": "makurdi",
              "display_name": "Donation for",
              "variable_name": "donation_for"
            }
          ]
        },
        "bank":{
            "code": "057",
            "account_number": "0000000000"
        },
        "birthday": "1995-12-23"
      })
    }).then((response) => response.json())
    .then((json) => {
      console.log(json)
    }).catch((error) => {
      console.log(error)
    })
  }
  
  useEffect(() => {
    console.log("calling api")
    callPay()
  }, [])

  const handleChange = data => {
    const key = Object.keys(data)[0];
    const val = data[key];
    console.log(key)
    updateCardDetails({...cardDetails, [key]: val});
  };

  const handleSubmit = () => {
    if (cardNumber == "") {
      alert("enter card 12 digits number")
      return
    } 

    if (cardHolderName == "") {
      alert("enter card holder name")
      return
    } 

    if (exp == "") {
      alert("enter expiry date")
      return
    }

    if (cvv == "") {
      alert("enter 3 digit verification code")
      return
    }
    alert(JSON.stringify(cardDetails))
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <HeaderSection />
        <AddCardRowContainer>
          <CardText>
            {"CARD NUMBER"}
          </CardText>
          <CardContainer>
            <CustomInput 
                onChangeText={text => handleChange({cardNumber: text})}
                value={cardNumber}
                placeholder={'1234   5678   9087   7654'}
                bgcolor={'#e0e0e0'}
                placeholderTextColor={'#4a4a4a'} 
                width={'95%'} 
                radius={'1px'}
                txtcolor={'#4a4a4a'} 
                keyboardType="numeric"
            />
            {/* <VISAContainer>
              <FontAwesome name="cc-visa" size={30} color={appColor} />
            </VISAContainer> */}
          </CardContainer>
        </AddCardRowContainer>
        <AddCardRowContainer>
          <CardText>
            {"CARDHOLDER NAME"}
          </CardText>
          <CardContainer>
            <CustomInput 
              onChangeText={text => handleChange({cardHolderName: text})}
              value={cardHolderName}
              placeholder={'John Doe'}
              bgcolor={'#e0e0e0'}
              placeholderTextColor={'#4a4a4a'} 
              width={'370px'} 
              radius={'1px'}
              txtcolor={'#4a4a4a'} 
              keyboardType="numeric"
            />
          </CardContainer>
        </AddCardRowContainer>
        <AddCardRowContainer>
          <CardContainer>
          <ExpireContainer>
            <CardText>
              {"EXPIRE DATE"}
            </CardText>
              <CustomInput 
                onChangeText={text => handleChange({exp: text})}
                value={exp}
                placeholder={'05  /  21'}
                bgcolor={'#e0e0e0'}
                placeholderTextColor={'#4a4a4a'} 
                width={'120px'} 
                radius={'1px'}
                txtcolor={'#4a4a4a'} 
                keyboardType="numeric"
              />
          </ExpireContainer>
          <CVVContainer>
            <CardText>
              {"CVV"}
            </CardText>
            <CustomInput 
              onChangeText={text => handleChange({cvv: text})}
              value={cvv}
              placeholder={'123'}
              bgcolor={'#e0e0e0'}
              placeholderTextColor={'#4a4a4a'} 
              width={'70px'} 
              radius={'1px'}
              txtcolor={'#4a4a4a'} 
              keyboardType="numeric"
            />
            </CVVContainer>
          </CardContainer>
        </AddCardRowContainer>
        <AddCardContainer>
        <CustomButton 
          onPress={handleSubmit} 
          loading={isSubmitting}
          space={'2px'} 
          uppercase={'true'} 
          width={'300px'} 
          color={'white'} 
          bgcolor={AppMainColor} 
          // box-shadow={}
          keyboardType="numeric"
          radius={'10px'}
          >
              <ButtonText weight={'bold'}>{'ADD CARD'}</ButtonText>
          </CustomButton>
      </AddCardContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings
})

export default connect(mapStateToProps)(AddCardScreen)