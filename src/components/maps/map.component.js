import React, { useEffect, useState } from 'react'; 
import { Marker } from 'react-native-maps';

import { MapContainer, MapViewContainer } from './map.styles';

navigator.geolocation = require('@react-native-community/geolocation');

const Map = ({}) => {
    var initialRegion = {};
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

	useEffect(() => {
		findPosition();
	}, []);

    return (
        <MapContainer>
            <MapViewContainer
                initialRegion={region}
                showsUserLocation={true}
            >

            </MapViewContainer>
        </MapContainer>
    )
}

export default Map;