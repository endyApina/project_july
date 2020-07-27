import React, {useState} from 'react'; 
import CustomButton from '../forms/custom-button/custom-button.component';
import CustomInput from '../forms/custom-input/custom-input.component';
import ButtonText from '../forms/button-text/button-text.component';

import {SignupContainer} from './Signup.styles';

const SignUp = ({}) => {
    const [ userData, updateData ] = useState({ 
        fullName: '', 
        email: '', 
        address: '',  
        phone: '', 
        userType: '', 
    })
    const { fullName, email, address, phone, userType } = userData;

    const handleSubmit = async () => {
        console.log("Signup submitted")
    }

    const handleChange = data => {
        const key = Object.keys(data)[0];
        const val = data[key];
        updateData({ ...userData, [key]: val });
    }

    return (
        <SignupContainer>
            <CustomInput 
                onChangeText={text => handleChange({ email: text })}
                value={fullName}
                autoCompleteType={'fullName'}
                placeholder={'Full Name'}
                bgcolor={'transparent'}
                space={'20px'} 
                leftIcon={'md-person'} 
                placeholderTextColor={'black'} 
                width={'100%'} 
                radius={'0px'} 
                border={'1px solid black'} 
                underline={'white'} 
                txtcolor={'black'} 
            />
            <CustomInput 
                onChangeText={text => handleChange({ email: text })}
                value={email}
                autoCompleteType={'email'}
                placeholder={'Email'}
                bgcolor={'transparent'}
                space={'20px'} 
                leftIcon={'md-mail'} 
                placeholderTextColor={'black'} 
                width={'100%'} 
                radius={'0px'} 
                border={'1px solid black'} 
                underline={'white'} 
                txtcolor={'black'} 
            />
        </SignupContainer>
    )
}

export default SignUp;