import React, { useState } from 'react'; 
import { connect } from 'react-redux';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import { createStructuredSelector } from 'reselect';
import CustomInput from '../../../components/forms/custom-input/custom-input.component';
import { InputViewContainer, ProfileFormContainer, ProfileRowContainer, SubmitButtonContainer } from './styles';
import LabelComponent from './InputLabel/label';
import { Divider } from "react-native-elements";
import CustomButton from '../../../components/forms/custom-button/custom-button.component';
import ButtonText from '../../../components/forms/button-text/button-text.component';

const inputHeight = '35px';


const ProfileForm = ({appSettings}) => {
  const [userData, updateDate] = useState({
    firstName: 'Endy', 
    lastName: 'Apinageri', 
    email: 'apinaendy@gmail.com',
    phoneNumber: '+2348165229905', 
    address: '12b, Ben Okagbue Mba Street',
  })

  const { 
    firstName,
    lastName,
    email,
    phoneNumber, 
    address
  } = userData;
  const { transparentBorder, boxShadow, AppMainColor, buttonTextColor, defaultButtonWidth, inputRadius, defaultInputWidth, defaultInputPlaceholderColor, defaultInputBgColor, defaultInputTextColor} = appSettings;

  return (
    <ProfileFormContainer> 
      <ProfileRowContainer> 
        <LabelComponent name={"Firstname"} />
        <InputViewContainer> 
          <CustomInput 
            // onChangeText={text => handleChange({ email: text })}
            value={firstName}
            placeholder={'Full Name'}
            bgcolor={defaultInputBgColor}
            space={'5px'} 
            placeholderTextColor={defaultInputPlaceholderColor} 
            width={defaultInputWidth} 
            radius={inputRadius} 
            border={transparentBorder} 
            paddingLeft={"0px"}
            // underline={'white'} 
            rightIcon={true}
            rightIconName={'edit-2'}
            txtcolor={defaultInputTextColor} 
            inputHeight={inputHeight}
          />
          <Divider />
        </InputViewContainer>
      </ProfileRowContainer>
      <ProfileRowContainer> 
        <LabelComponent name={"Lastname"} />
        <InputViewContainer> 
          <CustomInput
            value={lastName}
            autoCompleteType={'email'}
            placeholder={'Last Name'}
            bgcolor={defaultInputBgColor}
            space={'5px'} 
            placeholderTextColor={defaultInputPlaceholderColor} 
            width={defaultInputWidth} 
            radius={inputRadius} 
            border={transparentBorder} 
            paddingLeft={"0px"}
            // underline={'white'} 
            rightIcon={true}
            rightIconName={'edit-2'}
            txtcolor={defaultInputTextColor} 
            inputHeight={inputHeight}
          />
          <Divider />
        </InputViewContainer>
      </ProfileRowContainer>
      <ProfileRowContainer> 
        <LabelComponent name={"Email"} />
        <InputViewContainer> 
          <CustomInput
            value={email}
            autoCompleteType={'email'}
            placeholder={'Email'}
            bgcolor={defaultInputBgColor}
            space={'5px'} 
            placeholderTextColor={defaultInputPlaceholderColor} 
            width={defaultInputWidth} 
            radius={inputRadius} 
            border={transparentBorder} 
            paddingLeft={"0px"}
            // underline={'white'} 
            rightIcon={true}
            rightIconName={'edit-2'}
            txtcolor={defaultInputTextColor} 
            inputHeight={inputHeight}
          />
          <Divider />
        </InputViewContainer>
      </ProfileRowContainer>
      <ProfileRowContainer> 
        <LabelComponent name={"Phone"} />
        <InputViewContainer> 
          <CustomInput
            value={phoneNumber}
            placeholder={'Phone'}
            bgcolor={defaultInputBgColor}
            space={'5px'} 
            placeholderTextColor={defaultInputPlaceholderColor} 
            width={defaultInputWidth} 
            radius={inputRadius} 
            border={transparentBorder} 
            paddingLeft={"0px"}
            // underline={'white'} 
            rightIcon={true}
            rightIconName={'edit-2'}
            txtcolor={defaultInputTextColor} 
            inputHeight={inputHeight}
          />
          <Divider />
        </InputViewContainer>
      </ProfileRowContainer>
      <ProfileRowContainer> 
        <LabelComponent name={"Address"} />
        <InputViewContainer> 
          <CustomInput
            value={address}
            placeholder={'Address'}
            bgcolor={defaultInputBgColor}
            space={'5px'} 
            placeholderTextColor={defaultInputPlaceholderColor} 
            width={defaultInputWidth} 
            radius={inputRadius} 
            border={transparentBorder} 
            paddingLeft={"0px"}
            // underline={'white'} 
            rightIcon={true}
            rightIconName={'edit-2'}
            txtcolor={defaultInputTextColor} 
            inputHeight={inputHeight}
          />
          <Divider />
        </InputViewContainer>
      </ProfileRowContainer>
      <SubmitButtonContainer> 
        <CustomButton
          uppercase={'true'} 
          width={'320px'} 
          color={buttonTextColor} 
          bgcolor={AppMainColor} 
          box-shadow={boxShadow}
          radius={'10px'}
        > 
          <ButtonText
            weight={'bold'}
          > 
            {"SAVE CHANGES"}
          </ButtonText>
        </CustomButton>
      </SubmitButtonContainer>
    </ProfileFormContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings, 
})

export default connect(mapStateToProps)(ProfileForm)