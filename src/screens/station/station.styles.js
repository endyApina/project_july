import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const StationContainer = styled.View`
    background-color: ${({ bgcolor })=> bgcolor};
    padding: 20px;
`;

export const ImageContainer = styled.View`
    margin-left: 20px;
    margin-bottom: 20px;
`;
