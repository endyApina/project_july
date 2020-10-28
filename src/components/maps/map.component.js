import React, { useEffect, useState, useRef } from 'react'; 
import {StyleSheet, Platform} from 'react-native';
import {PROVIDER_GOOGLE} from 'react-native-maps';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createStructuredSelector } from 'reselect';
import {selectAppSettings} from '../../redux/settings/settings.selector'
import { connect } from 'react-redux';
import { MapContainer, MapViewContainer } from './map.styles';

navigator.geolocation = require('@react-native-community/geolocation');

const Map = ({appSettings}) => {
    var initialRegion = {
        latitude: 0, 
        longitude: 0, 
        latitudeDelta: 0, 
        longitudeDelta: 0
    };
    const [region, setRegion] = useState(initialRegion);

    const findPosition = payload => navigator.geolocation.getCurrentPosition(position => {
        var lat = parseFloat(position.coords.latitude); 
        var long = parseFloat(position.coords.longitude); 

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

	useEffect(() => {
		findPosition();
    }, []);

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
                    />
                    {/* <BottomSheet
                        ref={sheetRef}
                        snapPoints={snapPoints}
                        containerStyle={bottomSheetStyles.bottomSheetBorder}
                        body={<BottomSheetComponent />}
                        header={<BottomHeader />}
                        enabledContentTapInteraction={false}
                        enabledInnerScrolling = {true}
                        initialPosition = {"50%"}
                    /> */}
                </MapContainer>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = createStructuredSelector({
    appSettings: selectAppSettings,
})


export default connect(mapStateToProps)(Map);