import React, { useEffect, useState, useRef } from 'react'; 
import { Marker } from 'react-native-maps';
import {StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Text, View, TextInput, Button } from 'react-native';
import { createStructuredSelector } from 'reselect';
import {selectAppSettings} from '../../redux/settings/settings.selector'
import { connect } from 'react-redux';
import CustomButton from '../forms/custom-button/custom-button.component';
import ButtonText from '../forms/button-text/button-text.component'
import { MapContainer, BottomSheetPanelHandle, BottomSheetHeader, RenderContentView, MapViewContainer, TouchableOpacityContainer, SearchViewContainer, ButtonContainer } from './map.styles';
// import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheet from 'react-native-bottomsheet-reanimated';
import BottomSheetComponent from './bottom-sheet/bottom-sheet.component';
import BottomHeader from './bottom-sheet-header/bottom-sheet.component';

navigator.geolocation = require('@react-native-community/geolocation');

const Map = ({appSettings}) => {
    var initialRegion = {
        latitude: 0, 
        longitude: 0, 
        latitudeDelta: 0, 
        longitudeDelta: 0
    };
    const [region, setRegion] = useState(initialRegion);
	const originalSnapPoint = [350, 700, 1000];
	const [snapPoints, setSnapPoints] = useState(originalSnapPoint);
    const [showBottomSheet, toggleBottomSheet] = useState(false)
    const [value, onChangeText] = React.useState('');
    const { transparentBorder, inputSpace, boxShadow, buttonTextColor, defaultButtonBackgroundColor, defaultButtonWidth, inputRadius, defaultInputWidth, defaultInputPlaceholderColor, defaultInputBgColor, defaultInputTextColor} = appSettings;

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
    
    const bottomSheetStyles = StyleSheet.create({
        bottomSheetBorder: {
            borderRadius: 30,
        }
    });

    return (
        <>
        <MapContainer>
            <MapViewContainer
                provider={PROVIDER_GOOGLE}
                region={region}
            />
            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                containerStyle={bottomSheetStyles.bottomSheetBorder}
                body={<BottomSheetComponent />}
                header={<BottomHeader />}
                enabledContentTapInteraction={false}
                enabledInnerScrolling = {false}
                initialPosition = {"40%"}
                enabledInnerScrolling={true}
            />
        </MapContainer>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    appSettings: selectAppSettings,
})


export default connect(mapStateToProps)(Map);