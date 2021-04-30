import React, { useEffect, useState } from 'react'; 
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator, StyleSheet } from 'react-native'; 
import OrderHistoryScreen from './order-detail';
// import OrderDetailsScreen from './empty-order';
import NotificationCard from '../../components/notification-card'
import { apiHeaders, GAS_ORDER_HISTORY_API, getOrderDetail, getUserData } from '../../config';
import axios from 'axios';
import { toConfirmRequest } from '../../session';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeOrder = async(orderDetails) => {
  try {
    const jsonValue = JSON.stringify(orderDetails)
    // console.log(jsonValue)
    await AsyncStorage.setItem("order_details", jsonValue)
  } catch (e) {
    //saving error
  }
}

const OrderHistory = () => {
  const [tokenString, updateToken] = useState("")
  const [orderArray, updateOrderArray] = useState([])
  const [pageLoading, toggleLoader] = useState(true)
  const navigation = useNavigation();

  const handlePress = (item) => {
    storeOrder(item)
    toConfirmRequest(navigation)
  }

  const handleDate = (date) => {
    const fields = date.split('T')
    const time = fields[1].split('.')
    const newDate = fields[0] + " " + time[0]
    return newDate
  }

  useEffect(() => {
    getUserData().then((res) => {
      updateToken(res.token_string)
    })
  }, [])

  useEffect(() => {
    console.log(tokenString)
    const options = {
      headers: apiHeaders(tokenString)
    }

    axios.get(GAS_ORDER_HISTORY_API, options)
    .then((response) => {
      const responseData = response.data
      const responseBody = responseData.body 
      if (Array.isArray(responseBody)) {
        responseBody.forEach(element => {
          console.log(element)
        });
      }
      updateOrderArray(responseData.body)
      toggleLoader(false)
    }, (error) => {
      console.log("error")
      console.log(error)
    })
  }, [tokenString])

  return (
    <SafeAreaView> 
      <ScrollView> 
        {
          !pageLoading ? 
          <>
            {
              Array.isArray(orderArray) ? 
              orderArray.map((item, i) => (
                <NotificationCard 
                  key={i}
                  name={item.order.order_size + "KG Gas Order"}
                  description={item.order.order_status.toUpperCase()}
                  date={handleDate(item.order.created_at)}
                  onPress={() => handlePress(item)}
                />
              ))
              :
              <View
                style={
                  [styles.container, styles.horizontal]
                }
              > 
                <Text>{"You have 0 Orders"}</Text>
              </View>
            }
          </>
          : 
          <View
            style={[styles.container, styles.horizontal]}
          > 
            <ActivityIndicator 
              size="large"
              color="#00ff00"
            />
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default React.memo(OrderHistory)