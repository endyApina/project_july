import React, {useState, useEffect, useCallback} from 'react'; 
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { toggleLoadOrders } from '../../redux/user/user.action';
import { ScrollView, RefreshControl } from 'react-native';
import { DashboardContainer, OrderNowContainer } from './styles';
import FullNameText from './welcometext';
import { toGasOrderType } from '../../session';
import OrderSection from './orders';
import { getUserData, AppWait, apiHeaders, GAS_ORDER_HISTORY_API } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { ListItem } from "react-native-elements";
import AdminSummaryScreen from './carousel';
import {PayWithFlutterwave} from 'flutterwave-react-native'; 
import axios from 'axios';

const Dashboard = ({appSettings, toggleLoadOrders}) => {
  const [name, setName] = useState('');
  const {AppMainColor} = appSettings;
  const navigation = useNavigation(); 
  const [pendingOrderCount, addOrder] = useState(0);
  const [allOrderCount, updateOrderCount] = useState(0);
  const [tokenString, updateToken] = useState("");

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true) 
    AppWait(2000).then(() => setRefreshing(false))
    getOrders()
  })
  
  useEffect(() => {
    getUserData().then((res) => {
      setName(res.user_data.full_name)
      updateToken(res.token_string)
    })
  }, [])

  const getOrders = () => {
    // console.log(tokenString)
    const options = {
      headers: apiHeaders(tokenString)
    }

    axios.get(GAS_ORDER_HISTORY_API, options)
    .then((response) => {
      const responseData = response.data
      const responseBody = responseData.body 
      if (Array.isArray(responseBody)) {
        var counter = 0
        responseBody.forEach((element, pos) => {
          // console.log(element.order)
          if (element.order.order_status == "pending") {
            counter++
            addOrder(counter)
          }
        });
        updateOrderCount(responseBody.length)
      }

      // toggleLoader(false)
    }, (error) => {
      console.log("error retrieving gas orders")
      console.log(error)
      // getOrders()
    })

    console.log(allOrderCount)
  }

  useEffect(() => {
    getOrders()
  }, [tokenString])

  return (
    <ScrollView
      refreshControl={
        <RefreshControl 
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    > 
      <DashboardContainer> 
        <FullNameText name={name} />
        <OrderNowContainer> 
        <ListItem
          containerStyle={{
            backgroundColor: AppMainColor,
            borderTopLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderTopRightRadius: 15,
            height: 90,
          }}
          underlayColor="#c4c4c4"
          onPress={() => {
            toGasOrderType(navigation)
          }}
        > 
          <ListItem.Content> 
            <ListItem.Title 
              right
              style={{
                color: 'white',
                fontSize: 18,
                paddingBottom: 5,
              }}
            > 
              {"Order Gas Now!"}
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        </OrderNowContainer>
        {/* <OrderSection /> */}
        <AdminSummaryScreen 
        pendingOrderCount={pendingOrderCount}
        allOrderCount={allOrderCount}
        />
      </DashboardContainer>
    </ScrollView>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings, 
})

const mapDispatchToProps = dispatch => ({
  toggleLoadOrders: () => dispatch(toggleLoadOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)