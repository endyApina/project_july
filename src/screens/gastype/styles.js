import styled from 'styled-components';
import { Dimensions } from 'react-native' 

export const GasTypeContainer = styled.View`
  marginLeft: 3%;
  marginRight: 3%;
  height: ${Dimensions.get("window").height}px;
`;

export const OrderTextContainer = styled.Text`
  marginLeft: 5%;
  fontSize: 20px;
`;

export const OrderLineContainer = styled.View`
  flexDirection: row;
  marginLeft: 1%;
`;

export const GasTypeText = styled.Text``;