import styled from 'styled-components/native';

export const LoginContainer = styled.View`
    background-color: ${({ bgcolor })=> bgcolor};
    height: 100%;
    padding: 20px;
`;

export const Avatar = styled.Image`
    width: 110px;
    height: 100px;
    margin-left: 110px;
    margin-top: 40px;
    margin-bottom: 15px;
`;

export const SignInContainer = styled.View`
  margin-top: 50px;  
`;

export const GettingStartedContainer = styled.View`
  height: 100%;
  background-color: #ffffff;
  flex: 1;
  flexDirection: column;
  justifyContent: center;
`

export const GettingStartedText = styled.Text`
  textAlign: center;
  fontWeight: bold;
  fontSize: 16px;
`;