import styled from 'styled-components/native'; 
import MapView from 'react-native-maps'; 
import { Dimensions } from 'react-native';

export const MapContainer = styled.View`
    height: 100%;
`; 

export const MarkerViewContainer = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 100px;
    background-color: transparent;
`;

export const MarkerTextContainer = styled.Text`
    flex: 1;
    color: transparent; 
    text-align: center; 
    font-size: 14px; 
`;

export const MapViewContainer = styled(MapView)`
    flex: 1; 
    width: ${Dimensions.get('window').width}px; 
    min-height: ${Dimensions.get('window').height}px;
`;