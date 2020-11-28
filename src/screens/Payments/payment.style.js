import styled from 'styled-components';

export const PaymentScreenContainer = styled.View`
  paddingLeft: 20px;
  paddingRight: 20px;
  paddingTop: 20px;
`;

export const PaymentMethod = styled.Text`
  paddingTop: 10px; 
  paddingBottom: 15px;
  fontSize: 14px;
  color: #707070;
`;

export const FloatRight = styled.View`
  marginLeft: 140px;
  marginTop: 7px;
`;

export const CashFloatRight = styled.View`
  marginLeft: 208px;
  marginTop: 7px;
`;

export const ScreenContainer = styled.View`
  display: flex;
`;

export const CardContainer = styled.View`
  flexDirection: row;
  height: 50px;
`;

export const CardText = styled.Text`
  fontSize: 10px;
  paddingTop: 20px; 
  paddingBottom: 10px;
`;

export const CashText = styled.Text`
  fontSize: 15px;
  paddingTop: 20px; 
  paddingBottom: 10px;
`;

export const VISAContainer = styled.View`
  paddingLeft: 10px;
  marginRight: 20px;
  paddingTop: 10px;
  paddingBottom: 5px;
`;

export const VISANumber = styled.Text`
  paddingTop: 20px;
  marginLeft: 20px;
`;

export const PaymentText = styled.Text`
  fontSize: 15px;
  paddingTop: 14px;
  paddingBottom: 10px;
`;

export const SmallerText = styled.Text`
  marginTop: 30px;
  fontSize: 10px;
  color: #707070;
  paddingBottom: 7px;
  paddingLeft: 5px;
`;

export const PromotionContainer = styled.View`
  backgroundColor: ${({bgcolor}) => bgcolor ? bgcolor : '#fdba03'};
  height: 110px;
  borderRadius: 10px;
  marginTop: 20px;
`;

export const DistanceDetailsContainer = styled.View`
  paddingLeft: 15px;
  paddingTop: 15px;
`;

export const PaymentDiscountText = styled.Text`
  color: white;
  fontSize: 23px;
`;

export const PaymentSmallTextContainer = styled.View`
  paddingTop: 10px;
  paddingBottom: 10px;
`;

export const PaymentSmallTexts = styled.Text`
  fontSize: 10px;
  paddingBottom: 3px;
  color: white;
`;

export const PaymentFloatRight = styled.View`
  marginLeft: 155px;
  marginTop: 40px;
`;