import React from 'react'; 
import { StyleSheet, View, Text } from 'react-native';

const BottomHeader = () => {

    const bottomHeaderStyles = StyleSheet.create({
        headerText: {
            fontWeight: "bold", 
            fontSize: 20
        }, 
        topText: {
            fontSize: 10, 
            color: '#636363', 
            paddingBottom: 10, 
        }, 
        container: {
          backgroundColor: '#d6d6d6',
        }
    })

    return (
        <View>
            <Text style={bottomHeaderStyles.topText}>
                {"Nice to See you"}
            </Text>
            <Text style={bottomHeaderStyles.headerText}>
                {"Create Request"}
            </Text>
        </View>
    )
}

export default React.memo(BottomHeader);
