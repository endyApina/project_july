import styled from 'styled-components/native';

export const ButtonTextContainer = styled.Text`
 font-weight: ${({ weight }) => weight ? weight : 'bold'};
`;
