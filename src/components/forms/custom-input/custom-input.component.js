/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const mdEye = 'md-eye';
const mdEyeOff = 'md-eye-off';
const iconSize = 15;

import { InputViewContainer, TextInputContainer, IonIconsContainer, IconButtonContainer } from './custom-input.styles';

const CustomInput = ({ handleChange, left, forPassword, leftIcon, ...otherProps }) => {
	const [input, toggleInput] = useState({ secure: true, icon: mdEyeOff });
	const { secure, icon } = input;
	const { underline } = otherProps;

	return (
		<InputViewContainer {...otherProps}>
			<IonIconsContainer
				name={leftIcon} 
				size={iconSize} 
				color={underline}
				left={left}
			/>
			<TextInputContainer maxLength={50} secureTextEntry={forPassword ? secure: false} onChange={handleChange} {...otherProps} />

			{
				forPassword ?
					(   <IconButtonContainer
						onPress={() => 
							secure ? toggleInput({ secure: false, icon: mdEye })
								: toggleInput({ secure: true, icon: mdEyeOff })
						} 
					>
						<Ionicons 
							color={underline} 
							size={iconSize} 
							name ={icon}
						/>
					</IconButtonContainer>
					)
					: null
			}
		</InputViewContainer>
	);
}; 

export default React.memo(CustomInput);