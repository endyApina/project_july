import React, { useCallback, useEffect, useState } from 'react'; 
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native'; 
import OrderHistoryScreen from './order-detail';
// import OrderDetailsScreen from './empty-order';
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { selectLoadOrder } from '../../redux/user/user.selector';
import { toggleLoadOrders } from '../../redux/user/user.action';
import { connect } from 'react-redux';

import NotificationCard from '../../components/notification-card'
import { apiHeaders, AppWait, GAS_ORDER_HISTORY_API, getOrderDetail, getUserData } from '../../config';
import axios from 'axios';
import { toConfirmRequest, toGasOrderType } from '../../session';
import { useNavigation } from '@react-navigation/native';
import { EmptyView, OrdersContainer, OrderOverCon, PendingOrderDiv, EmptyOrderView, EmptyText, InnerView } from './orders';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomButton from '../../components/forms/custom-button/custom-button.component'; 
import ButtonText from '../../components/forms/button-text/button-text.component';
import {toCreateOrder} from '../../session';

const storeOrder = async(orderDetails) => {
  try {
    const jsonValue = JSON.stringify(orderDetails)
    // console.log(jsonValue)
    await AsyncStorage.setItem("order_details", jsonValue)
  } catch (e) {
    //saving error
  }
}

const OrderHistory = ({loadOrder, appSettings}) => {
  const [tokenString, updateToken] = useState("")
  const [orderArray, updateOrderArray] = useState([])
  const [pendingArray, updatePendingArray] = useState([])
  const [pageLoading, toggleLoader] = useState(true)
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false)

  const { defaultButtonBackgroundColor, boxShadow, AppMainColor, buttonTextColor, defaultButtonWidth, inputRadius, defaultInputWidth, defaultInputPlaceholderColor, defaultInputBgColor, defaultInputTextColor} = appSettings

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

  const onRefresh = useCallback(() => {
    setRefreshing(true) 
    toggleLoader(true)
    getOrders() 
    AppWait(1000).then(() => setRefreshing(false))
  })

  const getOrders = () => {
    // console.log(tokenString)
    const options = {
      headers: apiHeaders(tokenString)
    }

    axios.get(GAS_ORDER_HISTORY_API, options)
    .then((response) => {
      var tempOrderArray = []
      var tempPending = []
      var tempArrayData = {
        'order': [], 
        'status': ""
      }
      const responseData = response.data
      const responseBody = responseData.body 
      // console.log(responseData)
      if (Array.isArray(responseBody)) {
        responseBody.forEach((element, pos) => {
          // console.log(element)
          if (element.order.order_status == "pending") {
            tempPending.push(element)
            responseBody.splice(pos, 1)
          }
        });

        responseBody.forEach(element => {
          // console.log(element)
          tempOrderArray.push(element)
        });

      }

      updatePendingArray(tempPending)
      updateOrderArray(tempOrderArray)
      toggleLoader(false)
    }, (error) => {
      console.log("error retrieving gas orders")
      console.log(error)
    })
  }

  useEffect(() => {
    if (loadOrder) {
      getOrders()
    }
  }, [loadOrder])

  const orderGasNow = () => {
    // alert("order gas")
    toGasOrderType(navigation)
  }

  useEffect(() => {
    getOrders()
  }, [tokenString])

  return (
    <SafeAreaView> 
      <ScrollView
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      > 
        <OrderOverCon>
          {
            !pageLoading ? 
            <OrdersContainer> 
              {
                Array.isArray(orderArray) ? 
                pendingArray.map((item, i) => (
                  <NotificationCard 
                    key={i}
                    name={item.order.order_size + "KG Gas Order"}
                    description={item.order.order_status.toUpperCase()}
                    date={handleDate(item.order.created_at)}
                    onPress={() => handlePress(item)}
                    bgColor={'#ff5e00'}
                  />
                ))
                :
                null
              }
              {
                Array.isArray(orderArray) ? 
                orderArray.map((item, i) => (
                  <NotificationCard 
                    key={i}
                    name={item.order.order_size + "KG Gas Order"}
                    description={item.order.order_status.toUpperCase()}
                    date={handleDate(item.order.created_at)}
                    onPress={() => handlePress(item)}
                    bgColor={'#4130db'}
                  />
                ))
                :
                null
              }
              {
                orderArray == null && orderArray.length == 0 ?
                <EmptyOrderView
                  style={
                    [styles.container, styles.horizontal]
                  }
                > 
                  <InnerView>
                    <PendingOrderDiv> 
                      <EmptyText>{"You have no pending Orders"}</EmptyText>
                    </PendingOrderDiv>
                    <CustomButton 
                      onPress={orderGasNow} 
                      // loading={submissionLoader}
                      space={'20px'} 
                      uppercase={'true'} 
                      width={'330px'} 
                      color={buttonTextColor} 
                      bgcolor={defaultButtonBackgroundColor} 
                      box-shadow={boxShadow}
                      radius={'10px'}
                      // disabled={disableButton}
                    >
                      <ButtonText weight={'bold'}>{'Order Gas Now'}</ButtonText>
                    </CustomButton>  
                  </InnerView>
                </EmptyOrderView>
                :
                null
              }
            </OrdersContainer>
            : 
            <EmptyView
              style={[styles.container, styles.horizontal]}
            > 
              <ActivityIndicator 
                size="large"
                color="#00ff00"
              />
            </EmptyView>
          }
        </OrderOverCon>
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

const mapStateToProps = createStructuredSelector ({
  loadOrder: selectLoadOrder, 
  appSettings: selectAppSettings
})

export default connect(mapStateToProps)(OrderHistory)