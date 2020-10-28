import styled from 'styled-components/native';
import { Button } from 'react-native-paper';

export const CustomButtonContainer = styled(Button)`
    background-color: ${({ bgcolor }) => bgcolor ? bgcolor : 'purple'};
    width: ${({ width }) => width ? width : '100%'};
    margin: ${({ space }) => space ? space : '10px'};
    border-radius: ${({ radius }) => radius ? radius: '10px'};
    elevation: ${({ elevation }) => elevation ? elevation : 10};
`;
