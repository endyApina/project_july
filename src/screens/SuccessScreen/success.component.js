import React from 'react';
import LottieView from 'lottie-react-native';
import { Avatar } from './success.styles';

export default class Success extends React.Component {
  render() {
    return (
      <Avatar source={require('../../mainassets/success/success.png')} />
    );
  }
}