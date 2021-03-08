import React, { useEffect, useState } from 'react'; 
import { SafeAreaView, ScrollView } from 'react-native'; 
import OrderHistoryScreen from './order-detail';
// import OrderDetailsScreen from './empty-order';
import NotificationCard from '../../components/notification-card'
import { apiHeaders, GAS_ORDER_HISTORY_API, getUserData } from '../../config';
import axios from 'axios';

const allNotifications = [
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
  {
    name: 'Endy Apinageri', 
    order_description: '12kg Gas fill order', 
    date: 'Sept 12, 2020. 03:41:23 PM'
  }, 
]

const handlePress = (item) => {
  console.log("pressed")
  console.log(item)
}

const OrderHistory = () => {
  const [tokenString, updateToken] = useState("")

  useEffect(() => {
    getUserData().then((res) => {
      updateToken(res.token_string)
    })
  }, [])

  useEffect(() => {
    const options = {
      headers: apiHeaders(tokenString)
    }

    axios.get(GAS_ORDER_HISTORY_API, options)
    .then((response) => {
      console.log(response.data)
    })
  }, [tokenString])

  return (
    <SafeAreaView> 
      <ScrollView> 
        {
          allNotifications.map((item, i) => (
            <NotificationCard 
              key={i}
              name={item.name}
              description={item.order_description}
              date={item.date}
              onPress={() => handlePress(item)}
            />
          ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default React.memo(OrderHistory)