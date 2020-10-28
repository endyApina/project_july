import styled from 'styled-components/native';

export const LoginContainer = styled.View`
    background-color: ${({ bgcolor })=> bgcolor};
    height: 100%;
    padding: 20px;
`;

export const Avatar = styled.Image`
    width: 110px;
    height: 80px;
    margin-left: 110px;
    margin-top: 40px;
    margin-bottom: 15px;
`;

export const SignInContainer = styled.View`
  margin-top: 50px;  
`;