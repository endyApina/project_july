import React, {useState, useEffect} from 'react'; 
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native'; 
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { createStructuredSelector } from 'reselect';
import { Avatar, BoldWeightText, ViewContainer, ViewContainerRow, CancelButtonController, BoldNormalText, SmallHeaderText, NormalText, CustomButtonController } from './confirm-request.styles';
import CustomButton from '../../components/forms/custom-button/custom-button.component';
import ButtonText from '../../components/forms/button-text/button-text.component';
import { getUserData, getOrderDetail, apiHeaders, COMPLETE_GAS_ORDER } from '../../config';
import {toHome} from '../../session';
import Swipeable from 'react-native-swipeable';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  listItem: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },

});

const VendorRow = ({customerName}) => {
  return (
    <ViewContainer>
      <SmallHeaderText>
        {"Gas Weight"}
      </SmallHeaderText>
      <NormalText>
        {customerName}
      </NormalText>
    </ViewContainer>
  )
}

const AddressRow = ({street}) => {
  return (
    <ViewContainer> 
      <SmallHeaderText>
        {"Address:"}
      </SmallHeaderText>
      <NormalText>
        {street}
      </NormalText>
    </ViewContainer>
  )
}

const OrderInstructions = ({instruction}) => {
  return (
    <ViewContainer> 
      <SmallHeaderText> 
        {"Order Instructions"}
      </SmallHeaderText>
      <NormalText> 
        {instruction}
      </NormalText>
    </ViewContainer>
  )
}


const WeightRow = ({quantity}) => {
  return (
    <ViewContainerRow>
      <NormalText> 
        {"Quantity: "}
      </NormalText>
      <BoldWeightText> 
        {quantity}
      </BoldWeightText>
    </ViewContainerRow>
  )
}

const PriceRow = ({price}) => {
  return (
    <ViewContainerRow> 
      <NormalText>{"Cost:"}</NormalText>
      <BoldNormalText>{price}</BoldNormalText>
    </ViewContainerRow>
  )
}

const ConfirmRequestScreen = ({appSettings}) => {
  const { AppMainColor, boxShadow, buttonTextColor, defaultButtonBackgroundColor, defaultButtonWidth, inputRadius, defaultInputWidth, defaultInputPlaceholderColor, defaultInputBgColor, defaultInputTextColor} = appSettings;
  const navigation = useNavigation();

  const [orderData, updateData] = useState({
    customerName: "", 
    street: "",
    quantity: "",
    price: "",
    instruction: "", 
    orderStatus: "",
    gasWeight: "",
  })

  const [appState, updateState] = useState({
    leftActionActivated: false, 
    toggle: false, 
    currentlyOpenSwipeable: null, 
  });
  const [tokenString, setToken] = useState("");
  const [orderPostData, updateOrderPostData] = useState(null);
  const [accepted, toggleAcceptedStatus] = useState({
    status: false, 
    message: "", 
    color: "#dbdbdb",
  })

  useEffect(() => {
    getUserData().then((res) => {
      setToken(res.token_string)
    })
  }, [])

  const backToHome = () => {
    toHome(navigation)
  }

  const handleConfirmRequest = () => {
    updateState({...appState, toggle: !appState.toggle})
    console.log("completed")

    const options = {
      headers: apiHeaders(tokenString)
    }

    if (orderPostData == null) {
      return 
    }

    axios.post(COMPLETE_GAS_ORDER, orderPostData, options)
    .then((res) => {
      const responseData = res.data
      console.log(responseData)
      if (responseData.code == 200) {
        toggleAcceptedStatus({
          status: true
        })
        toggleAcceptedStatus({
          status: true, 
          color: "#639167", 
          message: responseData.body.order_status.toUpperCase()
        })
      }
    }, (error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getOrderDetail().then((res) => {
      const order = res.order 
      if (order.order_status == "accepted") {
        toggleAcceptedStatus({
          status: true, 
          color: "#639167", 
          message: order.order_status.toUpperCase()
        })
      } 
      updateOrderPostData(res.order)
      updateData({
        ...orderData, 
        customerName: res.user.full_name, 
        street: res.order.address,
        quantity: res.order.order_quantity,
        instruction: res.order.delivery_instructions,
        price: res.order.order_amount,
        orderStatus: res.order.order_status,
        gasWeight: res.order.order_size
      })
    }, (err) => {
      console.log(err)
    })
  }, [])

  return (
    <SafeAreaView> 
      <ScrollView> 
        <View>
        <Avatar source={require('../../../assets/gas-station.png')} />
          <VendorRow
            customerName={orderData.gasWeight + "KG"}
          />
          <Divider />
          <AddressRow 
            street={orderData.street}
          />
          <Divider />
          <WeightRow
            quantity={orderData.quantity}
          />
          <Divider />
          <PriceRow 
            price={"N"+ orderData.price}
          />
          <Divider />
          <OrderInstructions 
            instruction={orderData.instruction}
          />
          <Divider />
          <Divider />
          {
            accepted.status ? 
            <Swipeable
              leftActionActivationDistance={200}
              leftContent={(
                <View style={[styles.leftSwipeItem, {backgroundColor: appState.leftActionActivated ? 'lightgoldenrodyellow' : 'steelblue'}]}>
                  {appState.leftActionActivated ?
                    <Text>release!</Text> :
                    <Text>keep pulling!</Text>}
                </View>
              )}
              // onLeftActionActivate={() => updateState({...appState, leftActionActivated: true})}
              // onLeftActionDeactivate={() => updateState({...appState, leftActionActivated: false})}
              // onLeftActionComplete={() => handleConfirmRequest()}
            >
              <View style={[styles.listItem, {backgroundColor: appState.toggle ? 'thistle' : 'darkseagreen'}]}>
                <Text>{"Your Order has been confirmed."}</Text>
              </View>
            </Swipeable>
          : 
            <> 
              <View style={[styles.listItem, {backgroundColor: accepted.color}]}> 
                <Text> 
                  {"YOUR ORDER IS " + orderData.orderStatus.toUpperCase()}
                </Text>
              </View>
              <CancelButtonController>
                <CustomButton 
                  // onPress={backToHome} 
                  // loading={submissionLoader}
                  space={'10px'} 
                  uppercase={'true'} 
                  width={'230px'} 
                  color={buttonTextColor} 
                  bgcolor={AppMainColor} 
                  box-shadow={boxShadow}
                  radius={'10px'}
                  // disabled={disableButton}
                >
                  <ButtonText weight={'bold'}>{'Cancel Order'}</ButtonText>
                </CustomButton> 
              </CancelButtonController>
            </>
          }
          <CustomButtonController>
            <CustomButton 
              onPress={backToHome} 
              // loading={submissionLoader}
              space={'20px'} 
              uppercase={'true'} 
              width={'330px'} 
              color={buttonTextColor} 
              bgcolor={'#5c5c5c'} 
              box-shadow={boxShadow}
              radius={'10px'}
              // disabled={disableButton}
            >
              <ButtonText weight={'bold'}>{'Back To Home'}</ButtonText>
            </CustomButton> 
          </CustomButtonController>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings
})

export default connect(mapStateToProps)(ConfirmRequestScreen)