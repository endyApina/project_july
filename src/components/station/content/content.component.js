import React, {useState, useEffect} from 'react'; 
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import { connect } from 'react-redux';
import ButtonText from '../../forms/button-text/button-text.component';
import { View, Text, TextInput } from 'react-native'; 
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';
import { ContentContainer, AddressText, AdditionText, SubtrationText, SubtrationButton, IncreamentText, QuantityView, AdditionButton, AboutText, TimeText, DaysText, RatingIconContainer, RatingText, RatingContainer, KGContainer, KGText, PricingText, IncreamentSection, LineContainer, LocationContatainer, DeliveryInstructionContainer, PickerContainer } from './content.styles';
import CustomButton from '../../forms/custom-button/custom-button.component';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_STATION_BY_ID, UserAsyncData, StationAsyncData, UserGeoDataAsyncData, ORDER_GAS_API, apiHeaders, CANCEL_GAS_API, GasOrderData } from '../../../config';
import axios from 'axios';
import { Picker } from "@react-native-picker/picker";
import { toConfirmRequest } from '../../../session';

const Location = ({title, location}) => {
  return (
    <LocationContatainer> 
      <AddressText>
        {title}
      </AddressText>
      <Entypo name="location-pin" size={18} color="black" />
      <Text
        style={{
          // paddingLeft: '15',
        }}
      >
        {location}
      </Text>
    </LocationContatainer>
  )
}

const Pricing = ({weight, unit}) => {
  return (
    <LineContainer> 
      <PricingText> 
        {"Pricing: "}
      </PricingText>
      <KGContainer>
        <KGText>
          {weight+" / "+unit} 
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

const WorkHours = ({hours}) => {
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

const Weight = ({weight}) => {
  return (
    <RatingContainer> 
      <RatingText> 
        {"Weight"}
      </RatingText>
      <RatingIconContainer> 
        <TimeText> 
          {weight}
        </TimeText>
      </RatingIconContainer>
    </RatingContainer>
  )
}

const Price = ({price}) => {
  return (
    <RatingContainer> 
      <RatingText> 
        {"Price"}
      </RatingText>
      <RatingIconContainer> 
        <TimeText> 
          {price}
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

let resendOtpTimerInterval; 
const RESEND_OTP_TIME_LIMIT = 6; 

const OrderInstruction = ({ text, changeText}) => {
  return (
    <DeliveryInstructionContainer> 
      <LineContainer> 
        <PricingText> 
          {"Add Delivery Instructions"}
        </PricingText>
      </LineContainer>
      <TextInput 
        multiline={true}
        numberOfLines={3}
        // autoFocus
        autoCorrect
        style={{
          height: 50, 
          marginTop: 0,
          marginBottom: 30,
          borderColor: 'gray', 
          borderWidth: 1,
          borderRadius: 10,
          borderTopWidth: 0,
          borderLeftWidth: 0, 
          borderRightWidth: 0,
        }}
        onChangeText={changeText}
        value={text}
      />
    </DeliveryInstructionContainer>
  )
}

const AddressSection = ({ text, changeText}) => {
  return (
    <DeliveryInstructionContainer> 
      <LineContainer> 
        <PricingText> 
          {"Enter Address: "}
        </PricingText>
      </LineContainer>
      <TextInput 
        multiline={true}
        numberOfLines={3}
        // autoFocus
        autoCorrect
        style={{
          height: 40, 
          borderColor: 'gray', 
          borderWidth: 1,
          borderRadius: 10,
          borderTopWidth: 0,
          borderLeftWidth: 0, 
          borderRightWidth: 0,
        }}
        onChangeText={changeText}
        value={text}
      />
    </DeliveryInstructionContainer>
  )
}

const StationContent = ({appSettings}) => {
	const [userToken, setToken] = useState('');
  const [gasOrder, updateOrder] = useState({
    userID: "",
    userFullName: "", 
    userEmail: "", 
    userAddress: "",
    orderSize: "", 
    orderAmount: "", 
    deliveryInstruction: "",
  })
  const [userEmail, setEmail] = useState(""); 
  const [userID, setUserID] = useState(""); 
  const [userFullName, setFullName] = useState("");
  const navigation = useNavigation();
  const [submissionLoader, toggleLoader] = useState(false);
  const [disableButton, toggleDisableButton] = useState(false);
  const [submittingOrder, toggleSubmittingOrder] = useState(false);
  const [selectedDeliveryType, setSelectedDeliveryType] = useState();

	const getUserData = async () => {
		try {
      const jsonValue = await AsyncStorage.getItem(UserAsyncData)
      // console.log(jsonValue)
			if (jsonValue != null ) {
				const parsedValue = JSON.parse(jsonValue)
				const token = parsedValue.token_string
				setToken(token)
        const userID = parsedValue.user_data.id 
        const userEmail = parsedValue.user_data.email
        const userFullName = parsedValue.user_data.full_name 

        setEmail(userEmail)
        setUserID(userID)
        setFullName(userFullName)
			}
      // setTimeout(() => {
      //   console.log("USer: " + userEmail)
      //   console.log("USer: " + userID)
      //   console.log("USer: " + userFullName)
      // }, 2000);
			// return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch(e) {
			console.log(e)
		}
  }

  const getOrderDetails = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(GasOrderData)
      if (jsonValue != null) {
        var orderData = JSON.parse(jsonValue)
        updateOrder({
          ...gasOrder,
          orderSize: orderData.orderSize, 
          orderAmount: orderData.orderAmount
        })
      }
    } catch(e) {

    }
  }

	useEffect(() => {
		getUserData()
	}, [])
  
  useEffect(() => {
    getOrderDetails()
  }, [])


  const { boxShadow, buttonTextColor, defaultButtonBackgroundColor, AppMainColor} = appSettings;

  const [clicks, setClicks] = useState(0)
  
  const QuantitySection = () => {
    return (
      <IncreamentSection> 
        <LineContainer> 
          <PricingText> 
            {"Quantity: "}
          </PricingText>
          <SubtrationButton
            onPress={() => {setClicks(clicks-1)}}
          > 
            <SubtrationText>-</SubtrationText>
          </SubtrationButton>
          <QuantityView>  
            <IncreamentText> 
              {clicks}
            </IncreamentText>
          </QuantityView>
          <AdditionButton
            onPress={() => {
              setClicks(clicks+1)
            }}
          > 
            <AdditionText>+</AdditionText>
          </AdditionButton>
        </LineContainer>
      </IncreamentSection>
    )
  }
  const PickerSection = ({}) => {
    return (
      <PickerContainer> 
        <LineContainer> 
          <PricingText> 
            {"Select Delivery Type:"}
          </PricingText>
        </LineContainer>
        <Picker
          selectedValue={selectedDeliveryType}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedDeliveryType(itemValue)
          }
        >
          <Picker.Item label="Express" value="express" />
          <Picker.Item label="Regular" value="regular" />
          <Picker.Item label="Next Day" value="nextday" />
        </Picker>
      </PickerContainer>
    )
  }

  const handleChangeText = (text) => {
    updateOrder({
      ...gasOrder,
      deliveryInstruction: text
    })
  }

  const handleChangeAddress = (text) => {
    updateOrder({
      ...gasOrder,
      userAddress: text
    })
  }

  const storeOrder = async(orderDetails) => {
    try {
      const jsonValue = JSON.stringify(orderDetails)
      // console.log(jsonValue)
      await AsyncStorage.setItem("order_details", jsonValue)
    } catch (e) {
      //saving error
    }
  }

  const handleSubmitSuccess = (data) => {
    console.log(data) 
    if (data.code == 200) {
      const body = data.body 
      storeOrder(body)

      toConfirmRequest(navigation)
    }

    if (data.code != 200) {
      alert(data.message + ". Go to your orders section")
      return 
    }
  }
  
  const onSubmit = async () => {
    toggleDisableButton(true)
    toggleSubmittingOrder(true)
    toggleLoader(true)
    const orderData = {
      address: gasOrder.userAddress, 
      delivery_instructions: gasOrder.deliveryInstruction, 
      delivery_type: selectedDeliveryType,
      order_quantity: String(clicks), 
      user_email: userEmail, 
      user_full_name: userFullName,
      user_id: parseInt(userID), 
      order_size: gasOrder.orderSize, 
      order_amount: gasOrder.orderAmount
    }

    if (gasOrder.userAddress == "") {
      alert("Please Enter Delivery Address")
      toggleDisableButton(false)
      toggleLoader(false)
      toggleSubmittingOrder(false)
      return 
    }

    if (clicks == 0) {
      alert("Please specify quantity")
      toggleDisableButton(false)
      toggleLoader(false)
      toggleSubmittingOrder(false)
      return
    }

    console.log(orderData)
    const options = {
      headers: apiHeaders(userToken)
    }
    axios.post(ORDER_GAS_API, orderData, options)
    .then((response) => {
      handleSubmitSuccess(response.data)
      setTimeout(() => {
        toggleSubmittingOrder(false)
        toggleDisableButton(false)
        toggleLoader(false)
      }, 2000);
      toggleSubmittingOrder(true)
    }, (error) => {
      toggleSubmittingOrder(false)
      toggleDisableButton(false)
      toggleLoader(false)
      console.log(error)
      alert('There has been issues with placing your order information. Kindly check your orders page, and contact support.')
    })

    toggleDisableButton(false)
    toggleLoader(false)
    
  }

  const onCancel = async() => {
    toggleSubmittingOrder(false)
    //canceled
    const orderData = {
      address: gasOrder.userAddress, 
      delivery_instructions: gasOrder.deliveryInstruction, 
      delivery_type: selectedDeliveryType,
      order_quantity: String(clicks), 
      user_email: userEmail, 
      user_id: parseInt(userID), 
      order_size: gasOrder.orderSize, 
      order_amount: gasOrder.orderAmount
    }

    console.log(orderData)
    const options = {
      headers: apiHeaders(userToken)
    }
    axios.post(CANCEL_GAS_API, orderData, options)
    .then((response) => {
      console.log(response.data)
    }, (error) => {
      console.log(error)
    })
    toggleDisableButton(false)
    toggleLoader(false)
  }

  return (
    <>
    <ContentContainer> 
      {
        <>
          <Weight weight={gasOrder.orderSize + "Kg"} />
          <Divider />
          <Price price={"N" + gasOrder.orderAmount} />
          <AddressSection changeText={text => handleChangeAddress(text)} />
          <WorkHours hours={"hours"} />
          <Divider />
          <QuantitySection />
          <Divider />
          <OrderInstruction
            changeText={text => handleChangeText(text)}
          />
          <PickerSection />
          {
            !submittingOrder ? 
            <CustomButton 
              onPress={onSubmit} 
              loading={submissionLoader}
              space={'20px'} 
              uppercase={'true'} 
              width={'330px'} 
              color={buttonTextColor} 
              bgcolor={defaultButtonBackgroundColor} 
              box-shadow={boxShadow}
              radius={'10px'}
              disabled={disableButton}
            >
              <ButtonText weight={'bold'}>{'Place Order'}</ButtonText>
            </CustomButton>  
            : 
            <CustomButton 
              onPress={onCancel} 
              loading={true}
              space={'20px'} 
              uppercase={'true'} 
              width={'330px'} 
              color={buttonTextColor} 
              bgcolor={AppMainColor} 
              box-shadow={boxShadow}
              radius={'10px'}
            >
              <ButtonText weight={'bold'}>{'Cancel Order'}</ButtonText>
            </CustomButton>  
          }
        </>
      }
      
    </ContentContainer>
  </>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings, 
})

export default connect(mapStateToProps)(StationContent)