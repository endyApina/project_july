import React, { useEffect, useState, useRef } from 'react'; 
import {StyleSheet, Platform, View, Text} from 'react-native';
import {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createStructuredSelector } from 'reselect';
import {selectAppSettings} from '../../redux/settings/settings.selector'
import { connect } from 'react-redux';
import { MapContainer, MapViewContainer, MarkerTextContainer, MarkerViewContainer } from './map.styles';
import BottomSheetComponent from './bottom-sheet/bottom-sheet.component';
import BottomHeader from './bottom-sheet-header/bottom-sheet.component';
import BottomSheet from 'react-native-bottomsheet-reanimated';
import {startAPICall} from './util';
import { selectAppUserData } from '../../redux/user/user.selector';
import {GET_ALL_GAS_STATION} from '../../config';
import { useNavigation } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import { MAP_API_KEY, UserGeoDataAsyncData } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
Geocoder.init(MAP_API_KEY)

navigator.geolocation = require('@react-native-community/geolocation');

const customCoordinates = [
    {
        lng: 3.469209, 
        lat: 6.445233,
        name: "Modupe's Shop"
    }, 
    {
        lng: 3.468547, 
        lat: 6.439606, 
        name: "Benson's Shop"
    }, 
    {
        lng: 3.463923, 
        lat: 6.440523, 
        name: "Peninsula"
    }
]

const storeGeoCode = async (data) => {
    try {
        const jsonData = JSON.stringify(data)
      await AsyncStorage.setItem(UserGeoDataAsyncData, jsonData)
    } catch (e) {
      // saving error
    }
}

const Map = ({appSettings, appUserData}) => {
    const navigation = useNavigation();
    const [userToken, updateToken] = useState('')
    var initialRegion = {
        latitude: 0, 
        longitude: 0, 
        latitudeDelta: 0, 
        longitudeDelta: 0
    };
    const [region, setRegion] = useState(initialRegion);

    const findPosition = payload => navigator.geolocation.getCurrentPosition(position => {
        console.log(position)
        var lat = parseFloat(position.coords.latitude); 
        var long = parseFloat(position.coords.longitude); 

        Geocoder.from(position.coords.latitude, position.coords.longitude)
        .then(json => {
            // console.log(json);
            var addressComponent = json.results[0].address_components;
            console.log(addressComponent)
            console.log(addressComponent[0])
            var addressDetails = {
                street: addressComponent[0].short_name + " " + addressComponent[1].short_name + " " + addressComponent[2].short_name,
                lga: addressComponent[4].short_name,
                state: addressComponent[5].short_name, 
                lat: lat, 
                lng: long,
            }
            storeGeoCode(addressDetails)
        }).catch(err => console.log(err))

        var userRegion = {
            latitude: lat, 
            longitude: long, 
            latitudeDelta: 0.012, 
            longitudeDelta: 0.012
        };
        setRegion({...userRegion})

    }, (error) => console.log(JSON.stringify(error)), 
    {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000});

    const sheetRef = React.useRef(null);
	const originalSnapPoint = [250];
    const [snapPoints, setSnapPoints] = useState(originalSnapPoint);
    const [coords, updateCoords] = useState([]);

    useEffect(() => {
        updateToken(appUserData.accessToken)
    }, [])

	useEffect(() => {
		findPosition();
    }, []);

    useEffect(() => {
        var coordinates = startAPICall(GET_ALL_GAS_STATION)
        updateCoords(coordinates)
    }, []);

    const bottomSheetStyles = StyleSheet.create({
        bottomSheetBorder: {
            borderRadius: 30,
        }
    });

    const onCalloutTap = (stationID) => {
        // console.log(stationID)
        navigation.navigate('Create Order')
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{flex: 1}}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <MapContainer>
                    <MapViewContainer
                        provider={PROVIDER_GOOGLE}
                        region={region}
                    >
                        {
                            customCoordinates.map((item, i) => (
                                <Marker
                                    key={i}
                                    coordinate={{latitude: item.lat, longitude: item.lng}}
                                    title={item.name}
                                    // image={require('../../../assets/g2gapplogo.jpg')}
                                > 
                                    <Callout
                                        style={{
                                            width: 60
                                        }}
                                        key={i}
                                        onPress={() => onCalloutTap(item)}
                                    > 
                                        <View> 
                                            <Text> 
                                                This is plain text
                                            </Text>
                                        </View>
                                    </Callout>
                                    {/* <MarkerViewContainer> 
                                        <MarkerTextContainer>{"Hello Marker"}</MarkerTextContainer>
                                    </MarkerViewContainer> */}
                                </Marker>
                            ))
                        }
                    </MapViewContainer>
                    <BottomSheet
                        ref={sheetRef}
                        snapPoints={snapPoints}
                        containerStyle={bottomSheetStyles.bottomSheetBorder}
                        body={<BottomSheetComponent />}
                        header={<BottomHeader />}
                        enabledContentTapInteraction={false}
                        enabledInnerScrolling = {true}
                        initialPosition = {"35%"}
                    />
                </MapContainer>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = createStructuredSelector({
    appSettings: selectAppSettings,
    appUserData: selectAppUserData,
})


export default connect(mapStateToProps)(Map);