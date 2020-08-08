import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import colors from '../../../components/utility/styles/colors';;

// To handle one plus issue, we are adding two spaces at the end of text. This will cause center alignment issue
// so in such places use Text from react-native
const CustomTextHeader = function(props) {
  return (
    <Text {...props} style={[styles.style, props.style]}>
      {props.children}
      {`  `}
    </Text>
  );
};

const styles = StyleSheet.create({
  style: {
    color: colors.BLACK, 
    paddingTop: 5,
    paddingBottom: 20,
    marginBottom: 10, 
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 18,
  }
});

CustomTextHeader.propTypes = {
  style: Text.propTypes.style
};

export default CustomTextHeader;