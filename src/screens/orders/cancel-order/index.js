import React, {useState} from 'react'; 
import { SafeAreaView, View, ScrollView, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ListItem, Icon } from 'react-native-elements';
import { selectAppSettings } from '../../../redux/settings/settings.selector'; 
import { CancelScreenContainer, OtherInputContainer, ReasonText, OthersContainer, ReasonTextContainer, LineText, FloatRight, LineContainer} from './styles'; 
import { createStructuredSelector } from 'reselect';
import { toHome } from '../../../session';
import axios from 'axios';
import { getOrderDetail, apiHeaders, CANCEL_GAS_STATUS_API } from '../../../config';
import ButtonText from '../../../components/forms/button-text/button-text.component'; 
import CustomButton from '../../../components/forms/custom-button/custom-button.component';

const reason = [
  {
    reason: "Long delivery time",
  }, 
  {
    reason: "Gas delivered to the wrong address",
  },
  {
    reason: "Wrong delivery locations",
  },
  {
    reason: "Accidental request",
  },
  {
    reason: "Gas to go asked me to cancel",
  },
]

const CancelOrderScreen = ({appSettings}) => {
  const [pageLoading, toggleLoader] = useState(false);
  const [tokenString, setToken] = useState("");
  const { AppMainColor, buttonTextColor, defaultButtonBackgroundColor, boxShadow} = appSettings;
  const [cancelMessage, updateMessage] = useState('');
  const navigation = useNavigation();

  const handleChangeText = (text) => {
    updateMessage(text)
  }

  const handleSelection = (item) => {
    console.log(item)
    toggleLoader(true)

    getOrderDetail().then((res) => {
      const order = res.order 
      let data = {
        order_id: order.id, 
        user_email: order.user_email, 
        message: item.reason
      }

      const options = {
        headers: apiHeaders(tokenString)
      }

      axios.post(CANCEL_GAS_STATUS_API, data, options)
      .then((res) => {
        const responseData = res.data
        console.log(responseData)
        if (responseData.code == 200) {
          setTimeout(() => {
            toggleLoader(false)
            toHome(navigation)
          }, 2000);
        } else {
          toggleLoader(false)
          console.log(responseData.message)
          alert("unable to cancel order")
        }
        
      }, (error) => {
        toggleLoader(false)
      })
    })
  }


  return (
    <SafeAreaView>
      <ScrollView> 
        <CancelScreenContainer> 
          <ReasonTextContainer> 
            <ReasonText> 
              {"Cancellation reason"}
            </ReasonText>
          </ReasonTextContainer>
          {
            pageLoading ? 
            <View
              style={[styles.container, styles.horizontal]}
            > 
              <ActivityIndicator 
                size="large"
                color="#00ff00"
              />
            </View>
            :
            null
          }
         {
           reason.map((item, i) => (
            <ListItem 
              key={i} 
              bottomDivider 
              onPress={() => handleSelection(item)}
              containerStyle={{
                backgroundColor: 'transparent',
              }}
              underlayColor="#c4c4c4"
            >
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    fontSize: 15,
                  }}
                >
                  {item.reason}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron color='black' />
            </ListItem>
           ))
         }
         <OthersContainer> 
            <ReasonText> 
              {"Others"}
            </ReasonText>
            <OtherInputContainer> 
              <TextInput 
                multiline={true}
                numberOfLines={3}
                // autoFocus
                autoCorrect
                style={{
                  height: 100, 
                  marginTop: 0,
                  marginBottom: 30,
                  borderColor: 'gray', 
                  borderWidth: 1,
                  borderRadius: 10,
                  // borderTopWidth: 0,
                  // borderLeftWidth: 0, 
                  // borderRightWidth: 0,
                }}
                onChangeText={text => handleChangeText(text)}
                value={cancelMessage}
              />
              <CustomButton 
                // onPress={onSubmit} 
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
                <ButtonText weight={'bold'}>{'Submit Reason'}</ButtonText>
              </CustomButton>  
            </OtherInputContainer>
         </OthersContainer>
        </CancelScreenContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings
})

export default connect(mapStateToProps)(CancelOrderScreen)