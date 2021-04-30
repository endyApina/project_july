import React, {useState, useEffect} from 'react'; 
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { ScrollView } from 'react-native';
import { DashboardContainer, OrderNowContainer } from './styles';
import FullNameText from './welcometext';
import { toGasOrderType } from '../../session';
import OrderSection from './orders';
import { getUserData } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { ListItem } from "react-native-elements";

const Dashboard = ({appSettings}) => {
  const [name, setName] = useState('');
  const {AppMainColor} = appSettings;
  const navigation = useNavigation(); 
  
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
        <OrderSection />
      </DashboardContainer>
    </ScrollView>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings, 
})

export default connect(mapStateToProps)(Dashboard)