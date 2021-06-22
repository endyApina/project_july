import React, {useState, useEffect} from 'react'; 
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import { SummaryScreenContainer, Touch } from './styles';
import DetailsCard from './component/detailscard';
import {getUserData, apiHeaders, GAS_ORDER_HISTORY_API} from '../../../config';
import axios from 'axios';
import { toOrders } from '../../../session';
import { useNavigation } from '@react-navigation/native';

const AdminSummaryScreen = ({pendingOrderCount, allOrderCount}) => {
  const [tokenString, updateToken] = useState("")
  const [pageLoading, toggleLoader] = useState(true)

  const navigation = useNavigation();

  useEffect(() => {
    getUserData().then((res) => {
      updateToken(res.token_string)
    })
  }, [])

  const onClickOrder = () => {
    toOrders(navigation)
  }

  return (
    <SummaryScreenContainer>
      <Touch
        onPress={onClickOrder}
      >
        <DetailsCard 
          marginRight={"15px"}
          orderNumber={pendingOrderCount}
          status="Pending"
          bgcolor={'white'}
          txtcolor={'#ff5e00'}
        />
      </Touch>
      <Touch 
        onPress={onClickOrder}
      > 
        <DetailsCard 
          marginLeft={"0px"} 
          orderNumber={allOrderCount}
          status="All"
          txtcolor={'#4130db'}
        />
      </Touch>
    </SummaryScreenContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings, 
})

export default connect(mapStateToProps)(AdminSummaryScreen)