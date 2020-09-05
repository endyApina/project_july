import styled from 'styled-components/native';
import { Button } from 'react-native-paper';

export const ButtonContainer = styled.TouchableOpacity`
 display: flex;
 flex-direction: row;
 width: 90%;
 align-self: center;
 padding: 5px;
 padding-top: 20px;
 border-top-width: 1px;
 border-top-color: #eee;
 margin-top: 100px;
`;

export const ImageContainer = styled.Image`
    display: flex;
    align-self: center;
    margin: 10px;
    width: 100px;
    height: 100px;
    border-radius: 100px;
`;

export const UserProfileContainer = styled.View`
    display: flex;
    align-self: center;
    margin-bottom: 30px;
    width: 90%;
`;

export const UserProfileTextContainer = styled.Text`
    font-weight: bold;
    font-size: 16px;
    align-self: center;
`;

export const EditProfileButtonContainer = styled(Button)`
    align-self: center;
    background-color: purple;
    border-radius: 25px;
    elevation: 1;
    margin: 10px;
`;

export const ButtontextContainer = styled.Text`
    font-size: 10px;
    align-self: center;
    color: #fff;
`;


