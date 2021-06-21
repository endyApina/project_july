import React, {useState, useEffect} from 'react'; 
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import { SummaryScreenContainer } from './styles';
import DetailsCard from './component/detailscard';
import {getUserData, apiHeaders, GAS_ORDER_HISTORY_API} from '../../../config';
import axios from 'axios';

const AdminSummaryScreen = ({}) => {
  const [tokenString, updateToken] = useState("")
  const [pageLoading, toggleLoader] = useState(true)
  const [pendingOrderCount, addOrder] = useState(0)
  const [allOrderCount, updateOrderCount] = useState(0)

  useEffect(() => {
    getUserData().then((res) => {
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
          // console.log(element)
          if (element.order.order_status == "pending") {
            counter++
            addOrder(counter)
          }
        });
        updateOrderCount(responseBody.length)
      }

      toggleLoader(false)
    }, (error) => {
      console.log("error retrieving gas orders")
      console.log(error)
      // getOrders()
    })

    console.log(allOrderCount)
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <SummaryScreenContainer>
      <DetailsCard 
        marginRight={"15px"}
        orderNumber={pendingOrderCount}
        status="Pending"
        bgcolor={'white'}
        txtcolor={'#ff5e00'}
      />
      <DetailsCard 
        marginLeft={"0px"} 
        orderNumber={allOrderCount}
        status="All"
        txtcolor={'#4130db'}
      />
    </SummaryScreenContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings, 
})

export default connect(mapStateToProps)(AdminSummaryScreen)