import styled from 'styled-components/native';
import { Dimensions, TouchableOpacity } from 'react-native';

export const SettingsContainer = styled.View`
  height: ${Dimensions.get('window').height}px;
  paddingTop: 60px;
  paddingLeft: 20px;
  paddingRight: 20px;
  backgroundColor: white;
`;

export const AvatarContainer = styled.View`
  marginLeft: 120px;
  marginTop: 70px;
`; 

export const EmailTextContainer = styled.View`

`;

export const HelloContainer = styled.View`
  marginTop: 15px;
  paddingTop: 30px;
  paddingLeft: 5px;
`;

export const HelloText = styled.Text`
  fontSize: 20px;
`;