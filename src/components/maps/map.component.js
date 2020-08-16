import React, { useEffect, useState } from 'react'; 
import { Marker } from 'react-native-maps';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import CustomInput from '../forms/custom-input/custom-input.component';
import { Text, View, TextInput, Button } from 'react-native';
import { createStructuredSelector } from 'reselect';
import {selectAppSettings} from '../../redux/settings/settings.selector'
import { connect } from 'react-redux';
import CustomButton from '../forms/custom-button/custom-button.component';
import ButtonText from '../forms/button-text/button-text.component'
import { MapContainer, MapViewContainer, TouchableOpacityContainer, SearchViewContainer, ButtonContainer } from './map.styles';

navigator.geolocation = require('@react-native-community/geolocation');

const Map = ({appSettings}) => {
    var initialRegion = {
        latitude: 0, 
        longitude: 0, 
        latitudeDelta: 0, 
        longitudeDelta: 0
    };
    const [region, setRegion] = useState(initialRegion);
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

	useEffect(() => {
		findPosition();
	}, []);

    return (

        <View>
            <MapViewContainer
                provider={PROVIDER_GOOGLE}
                region={region}
            />
            <TouchableOpacityContainer>
                <CustomButton
                    onPress={() => {}}
                    space={'20px'} 
                    uppercase={'true'} 
                    width={defaultButtonWidth} 
                    color={buttonTextColor} 
                    bgcolor={'#4265ff'} 
                    box-shadow={boxShadow}
                    radius={'10px'}
                >
                    <ButtonText weight={'bold'}>{'Get Gas'}</ButtonText>
                </CustomButton>
            </TouchableOpacityContainer>
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    appSettings: selectAppSettings,
})


export default connect(mapStateToProps)(Map);