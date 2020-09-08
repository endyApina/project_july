import styled from 'styled-components/native';
import { Dimensions, TouchableOpacity } from 'react-native';

export const ContentContainer = styled.View`
  flex: 1.5;
  color: #ebebeb;
  height: ${Dimensions.get('window').height}px;
`;

export const LineContainer = styled.View`
  flexDirection: row;
  paddingTop: 20px;
  paddingBottom: 15px;
`;

export const LocationContatainer = styled.Text`
  font-size: 13px;
  padding-bottom: 5px;
  margin-bottom: 10px;
  color: #2e2e2e;
  flexDirection: row;
  justifyContent: space-between;
`

export const PricingText = styled.Text`
  font-weight: bold;
  padding-left: 10px;
  padding-right: 5px;
`;

export const KGContainer = styled.View`
  flex: 1;
  flexDirection: row;
  justifyContent: flex-end;
`;

export const KGText = styled.Text`
  flex: 1;
  flexDirection: row;
  justifyContent: flex-end;
  paddingLeft: 10px;
`;

export const RatingContainer = styled.View`
  paddingLeft: 10px;
  paddingTop: 20px;
  paddingBottom: 20px;
`;

export const RatingText = styled.Text`
  font-size: 12px;
  paddingBottom: 8px;
`;

export const RatingIconContainer = styled.View`
  flexDirection: row;
`;

export const DaysText = styled.Text`
  font-size: 14px;
  padding-right: 15px;
`;

export const TimeText = styled.Text`
  font-weight: bold;
`;

export const AboutText = styled.Text`

`;