import styled from 'styled-components'; 
import { Dimensions } from 'react-native';

export const DashboardContainer = styled.View`
  paddingTop: 20%;
  paddingLeft: 5%;
  paddingBottom: 5%;
  paddingRight: 5%;
  height: ${Dimensions.get('screen').height}px;
  backgroundColor: white;
`;

export const OrderNowContainer = styled.View`
  marginTop: 10%;
  marginBottom: 5%;
`;