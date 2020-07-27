import React from 'react';

import { ButtonTextContainer } from  './button-text.styles';

const ButtonText = ({ children, ...otherProps }) => (
	<ButtonTextContainer {...otherProps}>{children}</ButtonTextContainer>
);

export default ButtonText;