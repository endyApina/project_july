import React from 'react';

import { TextContainer } from './custom-text.styles';

const CustomTextContainer = ({ children, ...otherProps }) => (
    <TextContainer {...otherProps}>{children}</TextContainer>
)

export default CustomTextContainer;