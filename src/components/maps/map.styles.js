import styled from 'styled-components/native'; 
import MapView from 'react-native-maps'; 
import { Dimensions, TouchableOpacity } from 'react-native';

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

export const TouchableOpacityContainer = styled(TouchableOpacity)`
    position: absolute;
    background-color: transparent;
    border-color: #e3e1e1;
    top: 600px;
    border-radius: 10px;
    left: 0px;
    width: ${Dimensions.get('window').width - 45}px; 
    right: 0px;
`
export const SearchViewContainer = styled.View`
    height: 20px; 
    borderColor: transparent; 
    borderWidth: 2px;
    justifyContent: center;
    paddingTop: 10px;
`;

export const ButtonContainer = styled.View`
    height: 50px; 
    borderColor: #fff; 
    borderWidth: 2px;
    paddingTop: 10px;
`;

