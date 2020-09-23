import React, { useState } from 'react';
import { connect } from 'react-redux';
// import {BottomSheetContainer} from './bottom-sheet.styles'
import {Text, View} from 'react-native';
import { Divider } from 'react-native-paper';
import { createStructuredSelector } from 'reselect';
import { useNavigation } from '@react-navigation/native';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import CustomInput from '../../forms/custom-input/custom-input.component';
import { BottomSheetText, BottomSheetAddress } from './bottom-sheet.styles';
import ButtonText from '../../forms/button-text/button-text.component'; 
import CustomButton from '../../forms/custom-button/custom-button.component';
import { toConfirmRequest } from '../../../session';

const BottomSheetComponent = ({appSettings}) => {
    const [searchField, updateSearchField] = useState("");
    const { transparentBorder, boxShadow, buttonTextColor, defaultButtonBackgroundColor, defaultButtonWidth, inputRadius, defaultInputWidth, defaultInputPlaceholderColor, defaultInputBgColor, defaultInputTextColor} = appSettings
    const navigation = useNavigation();

    const hadleConfirmRequest = () => {
      toConfirmRequest(navigation)
    }

    return (
        <View style={{
            backgroundColor: 'white',
            padding: 16,
            height: 750
        }}>

          <BottomSheetText>
            {"Weight (Kg)"}
          </BottomSheetText>
          <CustomInput 
              // onChangeText={}
              value={searchField}
              autoCompleteType={'street-address'}
              placeholder={'Enter Weight'}
              bgcolor={defaultInputBgColor}
              placeholderTextColor={defaultInputPlaceholderColor} 
              width={defaultInputWidth} 
              radius={inputRadius} 
              border={transparentBorder} 
              // underline={'white'} 
              txtcolor={defaultInputTextColor} 
          />
          <BottomSheetAddress> 
            {"Address Line"}
          </BottomSheetAddress>
          <CustomInput 
              // onChangeText={}
              value={searchField}
              autoCompleteType={'street-address'}
              placeholder={'Search Location'}
              bgcolor={defaultInputBgColor}
              placeholderTextColor={defaultInputPlaceholderColor} 
              width={defaultInputWidth} 
              radius={inputRadius} 
              border={transparentBorder} 
              // underline={'white'} 
              txtcolor={defaultInputTextColor} 
          />
          <Divider style={{marginTop: 30}} />
          <CustomButton 
            onPress={hadleConfirmRequest} 
            loading={false}
            space={'20px'} 
            uppercase={'true'} 
            width={'335px'} 
            color={buttonTextColor} 
            bgcolor={defaultButtonBackgroundColor} 
            box-shadow={boxShadow}
            radius={'10px'}
          >
            <ButtonText weight={'bold'}>{'Confirm'}</ButtonText>
          </CustomButton> 
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    appSettings: selectAppSettings
})

export default connect(mapStateToProps)(BottomSheetComponent)