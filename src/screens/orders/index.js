import React from 'react'; 
import {View, Text} from 'react-native'; 
import OrderHistoryScreen from './order-detail';
// import OrderDetailsScreen from './empty-order';

const OrderHistory = () => {
  return (
    <OrderHistoryScreen />
    // <OrderDetailsScreen />
  )
}

export default React.memo(OrderHistory)