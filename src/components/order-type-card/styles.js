import styled from 'styled-components';

export const DetailsContainer = styled.View`
  border: 1px solid #f2f2f2;
  width: 48%;
  marginTop: 10%;
  borderRadius: 12px;
  height: 250px;
  paddingLeft: ${({paddingLeft}) => paddingLeft ? paddingLeft : '1px'};
  paddingRight: ${({paddingRight}) => paddingRight ? paddingRight : '1px'};
  marginLeft: ${({marginLeft}) => marginLeft ? marginLeft : '0px'};
  marginRight: ${({marginRight}) => marginRight ? marginRight : '0px'};
  backgroundColor: ${({bgcolor}) => bgcolor ? bgcolor : '#ffffff'}
`;

export const InnerContainer = styled.View`
  marginLeft: 10%;
  marginTop: 20%;
`;

export const TextContainer = styled.View`
  marginTop: 10%;
`;

export const ImageContainer = styled.View`

`;

export const DetailsText = styled.Text`
  fontSize: 20px;
  color: #454545;
`;

export const CylinderText = styled.Text`
  fontSize: 13px;
  color: #454545;
  fontWeight: bold;
`;

export const NumberContainer = styled.View`
  marginLeft: 2%;
  marginTop: 10%;
`;

export const NumberText = styled.Text`
  fontSize: 25px;
  color: #363636;
  fontWeight: 500;
`;