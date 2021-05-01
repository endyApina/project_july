import styled from 'styled-components';
import { Dimensions } from 'react-native';

export const CancelScreenContainer = styled.View`
height: ${Dimensions.get('window').height}px;
  paddingLeft: 20px;
  paddingRight: 20px;
  backgroundColor: #ffffff;
`;

export const LineContainer = styled.View`
  flexDirection: row;
`;

export const LineText = styled.Text`
paddingLeft: 5%;
marginRight: 20%;
paddingTop: 4%;
paddingBottom: 5%;
`;

export const ReasonTextContainer = styled.View`
  paddingBottom: 3%; 
  paddingLeft: 3%;
  alignItems: center;
`;

export const ReasonText = styled.Text`
  fontWeight: bold;
`;

export const OthersContainer = styled.View`
  paddingTop: 10%;
`;

export const OtherInputContainer = styled.View`
  paddingTop: 5%;
`;