import React, {useState, useEffect} from 'react'; 
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import { connect } from 'react-redux';
import ButtonText from '../../forms/button-text/button-text.component';
import { View, Text, TextInput } from 'react-native'; 
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';
import { ContentContainer, AddressText, AdditionText, SubtrationText, SubtrationButton, IncreamentText, QuantityView, AdditionButton, AboutText, TimeText, DaysText, RatingIconContainer, RatingText, RatingContainer, KGContainer, KGText, PricingText, IncreamentSection, LineContainer, LocationContatainer, DeliveryInstructionContainer } from './content.styles';
import CustomButton from '../../forms/custom-button/custom-button.component';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_STATION_BY_ID, UserAsyncData, StationAsyncData, UserGeoDataAsyncData, ORDER_GAS_API, apiHeaders, CANCEL_GAS_API } from '../../../config';
import axios from 'axios';
import LottieView from 'lottie-react-native';

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
          {"Delivery Instructions"}
        </PricingText>
      </LineContainer>
      <TextInput 
        multiline={true}
        numberOfLines={4}
        // autoFocus
        autoCorrect
        style={{
          height: 70, 
          marginTop: 0,
          marginBottom: 30,
          borderColor: 'gray', 
          borderWidth: 1,
        }}
        onChangeText={changeText}
        value={text}
      />
    </DeliveryInstructionContainer>
  )
}

const StationContent = ({appSettings}) => {
  const [dataUnit, setDataUnit] = useState("")
	const [userToken, setToken] = useState('');
	const [stationData, updateStation] = useState(null); 
  const [stationAmount, setAmount] = useState("");
  const [stationUnit, setUnit] = useState("");
  const [stationProperties, updateProperties] = useState({});
  const navigation = useNavigation();
  const [address, updateAddress] = useState(""); 
  const [geocodingData, updateGeocode] = useState({});
  const [appCoordinatesData, updateCoordinatesData] = useState({
      userStreetName: "", 
      userLGA: "", 
      userLAT: "", 
      userLNG: "", 
      userEmail: "",
      userID: "",
      userStateName: "", 
      shopLNG: "", 
      shopLAT: "",
      shopStreetName: "", 
      shopLGA: "", 
      shopStateName: "", 
      deliveryInstructions: "", 
      shopStationID: "",
      vendorEmail: "", 
      vendorID: ""
  })
  const [submissionLoader, toggleLoader] = useState(false);
  const [disableButton, toggleDisableButton] = useState(false);
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
  );
  const [submittingOrder, toggleSubmittingOrder] = useState(false);
  const [orderSuccess, toggleOrderSuccess] = useState(false);

	const getUserData = async () => {
		try {
      const jsonValue = await AsyncStorage.getItem(UserAsyncData)
      // console.log(jsonValue)
			if (jsonValue != null ) {
				const parsedValue = JSON.parse(jsonValue)
				const token = parsedValue.token_string
				setToken(token)
        const userID = parsedValue.user_data.id 
        // console.log(userID)
        const userEmail = parsedValue.user_data.email 
        // console.log(userEmail)
        updateCoordinatesData(prevState => {
          return {
            ...prevState, 
            userEmail: userEmail, 
            userID: userID, 
          }
        })
			}
			// return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch(e) {
			console.log(e)
		}
  }

  const getStationGeoData = (shopStationID) => {
    const options = {
      headers: apiHeaders(userToken)
    }

    axios.get(GET_STATION_BY_ID+shopStationID, options)
    .then((response) => {
      // console.log(response.data)
      const responsebody = response.data
      if (responsebody.code == 200) {
        setAmount(responsebody.body.amount)
        setUnit("KG")
        updateCoordinatesData(prevState => {
          return {
            ...prevState, 
            vendorEmail: responsebody.body.email, 
            vendorID: responsebody.body.id
          }
        })
      }
    }, (err) => {
      console.log(err)
    })
  }

  const getUserGeoData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(UserGeoDataAsyncData)
      if (jsonValue != null) {
        var addressComponent = JSON.parse(jsonValue)
        updateCoordinatesData(prevState => {
          return {
            ...prevState,
            userStateName: addressComponent.userStateName, 
            userLGA: addressComponent.userLGA, 
            userLAT: addressComponent.userLAT, 
            userLNG: addressComponent.userLNG, 
            userStreetName: addressComponent.userStreetName, 
            shopLNG: addressComponent.shopLNG, 
            shopLAT: addressComponent.shopLAT, 
            shopStreetName: addressComponent.shopStreetName, 
            shopLGA: addressComponent.shopLGA, 
            shopStateName: addressComponent.shopStateName, 
            shopStationID: addressComponent.shopStationID
          }
        })
        updateGeocode(addressComponent)
        getStationGeoData(addressComponent.shopStationID)
      }
    } catch(e) {

    }
  }
  
  const storeStationDetails = async (stationInfo) => {
		try {
			const jsonData = JSON.stringify(stationInfo) 
			await AsyncStorage.setItem(StationAsyncData, jsonData) 
		} catch (e) {
			// err
		}
	}

	useEffect(() => {
		getUserData()
	}, [])
  
  useEffect(() => {
    getUserGeoData()
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

  const handleChangeText = (text) => {
    updateCoordinatesData({
      ...appCoordinatesData, 
      deliveryInstructions: text
    })
  }

  

  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      // console.log(resendButtonDisabledTime)
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  
  const onSubmit = async () => {
    toggleDisableButton(true)
    toggleLoader(true)
    const orderData = {
      address: appCoordinatesData.userStreetName, 
      delivery_instructions: appCoordinatesData.deliveryInstructions, 
      user_lat: String(appCoordinatesData.userLAT), 
      user_lng: String(appCoordinatesData.userLNG), 
      order_quantity: String(clicks), 
      user_email: appCoordinatesData.userEmail, 
      user_id: appCoordinatesData.userID, 
      vendor_email: appCoordinatesData.vendorEmail, 
      vendor_id: appCoordinatesData.vendorID
    }

    if (clicks == 0) {
      alert("Please input quantity")
      toggleDisableButton(false)
      toggleLoader(false)
      return
    }

    // console.log(userToken)
    const options = {
      headers: apiHeaders(userToken)
    }
    axios.post(ORDER_GAS_API, orderData, options)
    .then((response) => {
      console.log(response.data)
      setTimeout(() => {
        toggleSubmittingOrder(false)
        toggleDisableButton(false)
        toggleLoader(false)
      }, 2000);
      toggleSubmittingOrder(true)
    }, (error) => {
      console.log(error)
      alert('check internet connection')
    })
    
  }

  const onCancel = async() => {
    toggleSubmittingOrder(false)
    //canceled
    const orderData = {
      address: appCoordinatesData.userStreetName, 
      delivery_instructions: appCoordinatesData.deliveryInstructions, 
      user_lat: String(appCoordinatesData.userLAT), 
      user_lng: String(appCoordinatesData.userLNG), 
      order_quantity: String(clicks), 
      user_email: appCoordinatesData.userEmail, 
      user_id: appCoordinatesData.userID, 
      vendor_email: appCoordinatesData.vendorEmail, 
      vendor_id: appCoordinatesData.vendorID
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
        !orderSuccess ? 
        <>
          <Location title={"My Location: "} location={appCoordinatesData.userStreetName} />
          <Divider />
          <Location title={"Station: "} location={appCoordinatesData.shopStreetName} />
          <Divider />
          <Pricing weight={stationAmount} unit={stationUnit} />
          {/* <Divider /> */}
          {/* <Ratings /> */}
          <Divider />
          <WorkHours hours={"hours"} />
          <Divider />
          <QuantitySection />
          <Divider />
          <OrderInstruction
            text={appCoordinatesData.deliveryInstructions}
            changeText={text => handleChangeText(text)}
          />
          <Divider />
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
        :
        <LottieView 
          source={require('../../../../assets/lottie/17828-success.json')}
          autoPlay
          loop={false}
          style={{
            marginTop: 50,
          }}
        /> 
      }
      
    </ContentContainer>
  </>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings, 
})

export default connect(mapStateToProps)(StationContent)