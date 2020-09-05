import styled from 'styled-components/native'
import { SvgXml } from 'react-native-svg';

export const CustomSvgXmlContainer = styled(SvgXml)`
background-color: ${({ bg }) => bg ? bg : 'white'};
position: relative;
top: ${({ topPosition }) => topPosition ? topPosition : '0px'};
width: ${({ width }) => width ? width : '100%'};
max-width: ${({ width }) => width ? width : '100%'};
max-height: ${({ height }) => height ? height : '200px'};
align-self: center;
margin: ${({ space }) => space ? space : '0px'};
`;