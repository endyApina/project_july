import React from 'react';
import { ListItem } from 'react-native-elements'
import {View} from 'react-native';

const list = [
    {
      name: 'Forte Gas Station',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: '21, Lekki-Ajah Express Way',
      distance: '1km'
    },
    {
      name: 'Peninsula Gas',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: '41, Yaba, Lagos',
      distance: '4m'
    },
]

const VendorList = () => {

    const pressedList = () => {
        alert("Pressed")
    }

    return (
        <View>
            {
                list.map((l, i) => (
                <ListItem
                    key={i}
                    leftAvatar={{ source: { uri: l.avatar_url }, rounded: false }}
                    title={l.name}
                    subtitle={l.subtitle}
                    bottomDivider
                    rightElement={l.distance}
                    onPress={pressedList}
                />
                ))
            }
        </View>
    )
}

export default React.memo(VendorList)