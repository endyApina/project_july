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
        }
    })

    return (
        <View>
            <Text style={bottomHeaderStyles.topText}>
                {"Welcome"}
            </Text>
            <Text style={bottomHeaderStyles.headerText}>
                {"Where are you?"}
            </Text>
        </View>
    )
}

export default React.memo(BottomHeader);
