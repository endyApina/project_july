import React from 'react'; 
import {View, Text} from 'react-native'; 

const OrderHistoryScreen = () => {
  return (
    <View 
      style={{
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center', 
        // backgroundColor: 'blue'
      }}
    >
      <Text
        style={{
          fontSize: 35,
        }}
      >
        {"0"}
      </Text>
      <Text> 
        {"You have no pending orders"}
      </Text>
    </View>
  )
}

export default React.memo(OrderHistoryScreen)