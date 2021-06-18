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
import { getUserData, AppWait } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { ListItem } from "react-native-elements";
import AdminSummaryScreen from './carousel';

const Dashboard = ({appSettings, toggleLoadOrders}) => {
  const [name, setName] = useState('');
  const {AppMainColor} = appSettings;
  const navigation = useNavigation(); 

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true) 
    AppWait(2000).then(() => setRefreshing(false))
    // toggleLoadOrders()
  })
  
  useEffect(() => {
    getUserData().then((res) => {
      setName(res.user_data.full_name)
    })
  }, [])

  return (
    <ScrollView> 
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
        <AdminSummaryScreen />
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