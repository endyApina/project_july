import React, {useState, useEffect} from 'react'; 
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import { connect } from 'react-redux';
import { StyleSheet, Button, AlertIOS } from 'react-native';
import ButtonText from '../../forms/button-text/button-text.component';
import { View, Text } from 'react-native'; 
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';
import { ContentContainer, AddressText, AdditionText, SubtrationText, SubtrationButton, IncreamentText, QuantityView, AdditionButton, AboutText, TimeText, DaysText, RatingIconContainer, RatingText, RatingContainer, KGContainer, KGText, PricingText, IncreamentSection, LineContainer, LocationContatainer } from './content.styles';
import CustomButton from '../../forms/custom-button/custom-button.component';
import { useNavigation } from '@react-navigation/native';
import { toOrderScreen } from '../../../session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_STATION_BY_ID, OTP_PREFIX, UserAsyncData, StationAsyncData, UserGeoDataAsyncData, CREATE_ORDER_API } from '../../../config';
import {toOrders} from '../../../session';

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


const StationContent = ({appSettings}) => {
  const [dataUnit, setDataUnit] = useState("")
	const [userToken, setToken] = useState('');
	const [stationData, updateStation] = useState(null); 
  const [stationAmount, setAmount] = useState('');
  const [stationUnit, setUnit] = useState('');
  const [stationProperties, updateProperties] = useState({});
  const navigation = useNavigation();
  const [address, updateAddress] = useState(""); 
  const [geocodingData, updateGeocode] = useState({});
  const [appCoordinatesData, updateCoordinatesData] = useState({
      userStreetName: "", 
      userLGA: "", 
      userLAT: "", 
      userLNG: "", 
      userStateName: "", 
      shopLNG: "", 
      shopLAT: "",
      shopStreetName: "", 
      shopLGA: "", 
      shopStateName: ""
  })
  const [submissionLoader, toggleLoader] = useState(false);
  const [disableButton, toggleDisableButton] = useState(false);

	const getUserData = async () => {
		try {
      const jsonValue = await AsyncStorage.getItem(UserAsyncData)
      // console.log(jsonValue)
			if (jsonValue != null ) {
				const parsedValue = JSON.parse(jsonValue)
				const token = parsedValue.accessToken
				setToken(token)
				// console.log(userToken)
			}
			// return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch(e) {
			console.log(e)
		}
  }

  const getUserGeoData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(UserGeoDataAsyncData)
      if (jsonValue != null) {
        console.log(JSON.parse(jsonValue))
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
            shopStateName: addressComponent.shopStateName
          }
        })
        console.log(addressComponent)
        updateGeocode(addressComponent)
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

  const stationID = 1

	useEffect(() => {
		getUserData()
	}, [])


	useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const apiToken = OTP_PREFIX + userToken
    if (userToken == "") {
      return 
    }
    fetch(GET_STATION_BY_ID+stationID, {
      method: 'GET', 
      headers: {
        'source': 'mobile', 
				'Content-Type': 'application/json', 
				'Authorization': apiToken, 
      }
    }, {
      signal: signal
    })
    .then(results => results.json())
    .then(jsonValue => {
      if (jsonValue != null && jsonValue.status != "error") {
        setAmount(jsonValue.amount)
        updateStation(jsonValue)
        setUnit(jsonValue.measureUnit)
      }
    })

    return function cleanUp() {
      abortController.abort()
    }
  }, [userToken])
  
  useEffect(() => {
    getUserGeoData()
  }, [])


  const { transparentBorder, boxShadow, buttonTextColor, defaultButtonBackgroundColor, defaultButtonWidth, inputRadius, defaultInputWidth, defaultInputPlaceholderColor, defaultInputBgColor, defaultInputTextColor} = appSettings;

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

  const onSubmit = async () => {
    toggleDisableButton(true)
    toggleLoader(true)
    const orderData = {
      stationId: stationID, 
      quantity: clicks, 
      shipAddress: {
        street: appCoordinatesData.shopLGA,
        lga:  appCoordinatesData.userLGA, 
        state: appCoordinatesData.userStateName, 
        lat: appCoordinatesData.userLAT, 
        lng: appCoordinatesData.userLNG
      }
    }

    if (clicks == 0) {
      alert("Please input quantity")
      toggleDisableButton(false)
      toggleLoader(false)
      return
    }

    console.log(orderData)
    const apiToken = OTP_PREFIX + userToken
    const response = await fetch(CREATE_ORDER_API, {
      method: 'POST', 
      headers: {
        'source': 'mobile', 
				'Content-Type': 'application/json', 
				'Authorization': apiToken, 
      }, 
      body: JSON.stringify(orderData)
    });

    const jsonValue = await response.json(); 
    console.log(jsonValue)
    console.log(jsonValue.data)
    setTimeout(() => {
      toggleDisableButton(false)
      toggleLoader(false)
      toOrders(navigation)
    }, 2000);
  }

  return (
    <>
    <ContentContainer> 
      <Location title={"My Location: "} location={appCoordinatesData.userStreetName} />
      <Divider />
      <Location title={"Station: "} location={appCoordinatesData.shopStreetName} />
      <Divider />
      <Pricing weight={stationAmount} unit={stationUnit} />
      <Divider />
      <Ratings />
      <Divider />
      <WorkHours hours={"hours"} />
      <Divider />
      {/* <Description /> */}
      <QuantitySection />
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
    </ContentContainer>
  </>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings, 
})

export default connect(mapStateToProps)(StationContent)