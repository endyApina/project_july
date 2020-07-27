/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { CustomButtonContainer } from './custom-button.styles';

const CustomButton = ({ children, ...otherProps }) => (
	<CustomButtonContainer {...otherProps}>
		{children}
	</CustomButtonContainer>
);

CustomButton.propTypes = {
	text: PropTypes.string,
	handlePress: PropTypes.func,
};

export default React.memo(CustomButton);