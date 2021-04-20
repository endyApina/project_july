import React, {useEffect, useState} from 'react'; 
import { Pressable, TouchableOpacity, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { GasTypeContainer, OrderLineContainer, OrderTextContainer } from './styles';
import OrderTypeCard from '../../components/order-type-card';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { GasOrderData, getUserData } from '../../config';
import { toCreateOrder } from '../../session';

const gasOrderType = {
  firstOrderSize: "15", 
  firstOrderPrice: "12,000", 
  secondOrderSize: "5", 
  secondOrderPrice: "14,000", 
  thirdOrderSize: "6", 
  thirdOrderPrice: "16,000", 
  fourthOrderSize: "12.5", 
  fourthOrderPrice: "30,000", 
  fifthOrderSize: "25", 
  fifthOrderPrice: "60,000",
  sixthOrderSize: "50", 
  sixthOrderPrice: "100,000",  
}


const GasOrderType = ({}) => {
  const [name, setName] = useState(''); 
  const navigation = useNavigation();
  const [gasOrder, updateOrder] = useState({
    orderSize: "", 
    orderAmount: "", 
  })

  useEffect(() => {
    getUserData().then((res) => {
      const fullName = res.user_data.full_name
      const firstName = fullName.split(" ")
      setName(firstName[0])
    })
  }, [])


  const storeGasOrder = async() => {
    try {
      const jsonData = JSON.stringify(gasOrder)
      await AsyncStorage.setItem(GasOrderData, jsonData)
    } catch (e) {

    }
  }

  const navigateToOder = () => {
    storeGasOrder()
    toCreateOrder(navigation)
  }

  const firstChoice = () => {
    updateOrder({
      orderSize: gasOrderType.firstOrderSize, 
      orderAmount: gasOrderType.firstOrderPrice
    })

    navigateToOder()
  }

  const secondChoice = () => {
    updateOrder({
      orderSize: gasOrderType.secondOrderSize, 
      orderAmount: gasOrderType.secondOrderPrice
    })

    navigateToOder()
  }

  const thirdChoice = () => {
    updateOrder({
      orderSize: gasOrderType.thirdOrderSize, 
      orderAmount: gasOrderType.thirdOrderPrice
    })

    navigateToOder()
  }

  const fourthChoice = () => {
    updateOrder({
      orderSize: gasOrderType.fourthOrderSize, 
      orderAmount: gasOrderType.fourthOrderPrice
    })

    navigateToOder()
  }

  const fifthChoice = () => {
    updateOrder({
      orderSize: gasOrderType.fifthOrderSize, 
      orderAmount: gasOrderType.fifthOrderPrice
    })

    navigateToOder()
  }

  const sixthChoice = () => {
    updateOrder({
      orderSize: gasOrderType.sixthOrderSize, 
      orderAmount: gasOrderType.sixthOrderPrice
    })

    navigateToOder()
  }

  return (
    <SafeAreaView> 
      <ScrollView> 
        <GasTypeContainer> 
          <OrderTextContainer> 
            {name +", please select your gas type "}
          </OrderTextContainer>
          <OrderLineContainer> 
            <OrderTypeCard 
              marginRight={"15px"} 
              gasType={ gasOrderType.firstOrderSize + "kg"} 
              cost={"N" + gasOrderType.firstOrderPrice}
              onClick={firstChoice}
            />
            <OrderTypeCard 
              marginLeft={"0px"} 
              bgcolor={"#2dd8ff"} 
              gasType={gasOrderType.secondOrderSize + "kg"} 
              cost={"N" + gasOrderType.secondOrderPrice}
              onClick={secondChoice}
            />
          </OrderLineContainer>
          <OrderLineContainer> 
            <OrderTypeCard 
              marginRight={"15px"} 
              bgcolor={"#2dd8ff"} 
              gasType={gasOrderType.thirdOrderSize + "kg"} 
              cost={"N" + gasOrderType.thirdOrderPrice} 
              onClick={thirdChoice}
            />
            <OrderTypeCard 
              marginLeft={"0px"} 
              gasType={gasOrderType.fourthOrderSize + "kg"} 
              cost={"N" + gasOrderType.fourthOrderPrice} 
              onClick={fourthChoice}
            />
          </OrderLineContainer>
          <OrderLineContainer> 
            <OrderTypeCard 
              marginRight={"15px"} 
              gasType={gasOrderType.fifthOrderSize + "kg"} 
              cost={"N" + gasOrderType.fifthOrderPrice} 
              onClick={fifthChoice}
            />
            <OrderTypeCard 
              marginLeft={"0px"} 
              bgcolor={"#2dd8ff"} 
              gasType={gasOrderType.sixthOrderSize + "kg"} 
              cost={"N" + gasOrderType.sixthOrderPrice}
              onClick={sixthChoice}
            />
          </OrderLineContainer>
        </GasTypeContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings
})

export default connect(mapStateToProps)(GasOrderType)