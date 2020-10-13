import React from 'react';
import LottieView from 'lottie-react-native';
import { Avatar } from './success.styles';
import { useNavigation } from '@react-navigation/native';
import { toHome } from '../../session';

const Success = () => {
  const navigation = useNavigation();
  setTimeout(() => {
    toHome(navigation)
  }, 2000);

  return (
    <Avatar source={require('../../mainassets/success/success.png')} />
  );
}

export default React.memo(Success)