import React from 'react'; 
import { View } from 'react-native';
import PropTypes from 'prop-types';

import colors from '../../utility/styles/colors';
import { GenericStyles } from '../../utility/styles/GenericStyles';
import { TextInput } from 'react-native-paper';

const CustomTextInput = (props) => {
    const {
        containerStyle, 
        style, 
        LeftComponent, 
        RightComponent, 
        refCallback, 
        ...additionalProps
    } = props; 

    return (
        <View
         style={}
        > 
            {LeftComponent}
            <TextInput
                {...additionalProps}
                style={}
                ref={refCallback}
            />
            {RightComponent}
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row',
        borderColor: colors.WHITE_GREY,
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
    },
    textInputStyle: {
    padding: 0,
    },
})

CustomTextInput.defaultProps = {
    LeftComponent: <></>,
    RightComponent: <></>,
};

CustomTextInput.propTypes = {
containerStyle: ViewPropTypes.style,
style: ViewPropTypes.style,
LeftComponent: PropTypes.object,
RightComponent: PropTypes.object,
refCallback: PropTypes.func,
};

export default CustomTextInput;