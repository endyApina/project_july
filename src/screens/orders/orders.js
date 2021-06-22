import styled from 'styled-components';
import { Dimensions } from 'react-native';

export const OrdersContainer = styled.View`
    backgroundColor: white;
`;

export const OrderOverCon = styled.View`
backgroundColor: white;
`;

export const OrderSection = styled.Text`
  marginTop: 5%;
  marginLeft: 7%;
  color: black;
  fontSize: 17px;
`;

export const SomeText = styled.Text`

`;

export const EmptyView = styled.View`
  height: ${Dimensions.get('screen').height}px;
`;

export const EmptyOrderView = styled.View`
  height: ${Dimensions.get('screen').height}px;
  display: flex; 
  justify-content: center;
  align-items: center;
`;

export const InnerView = styled.View``;

export const PendingOrderDiv = styled.View`
  paddingLeft: 27%;
`;

export const EmptyText = styled.Text`

`