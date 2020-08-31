import React, { useState } from 'react';
import { connect } from 'react-redux';
// import {BottomSheetContainer} from './bottom-sheet.styles'
import {Text, View} from 'react-native';
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import CustomInput from '../../forms/custom-input/custom-input.component';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import MapApp from '../autocomplete/autocomplete.component';
import VendorList from '../vendor-list/list.component';

const BottomSheetComponent = ({appSettings}) => {
    const [searchField, updateSearchField] = useState("");
    const { transparentBorder, boxShadow, buttonTextColor, defaultButtonBackgroundColor, defaultButtonWidth, inputRadius, defaultInputWidth, defaultInputPlaceholderColor, defaultInputBgColor, defaultInputTextColor} = appSettings
    return (
        <View style={{
            backgroundColor: 'white',
            padding: 16,
            height: 750
        }}>

        {/* <MapApp /> */}
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

        <VendorList />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    appSettings: selectAppSettings
})

export default connect(mapStateToProps)(BottomSheetComponent)