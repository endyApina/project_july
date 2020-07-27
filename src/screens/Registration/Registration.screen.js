import React from 'react'; 
import Signup from '../../components/Signup/Signup.form';

import { RegsitrationContainer } from './Registration.styles';
import SignUp from '../../components/Signup/Signup.form';

const RegistrationScreen = ({}) => {
    return (
        <RegsitrationContainer>
            <SignUp />
        </RegsitrationContainer>
    )
}

export default RegistrationScreen;