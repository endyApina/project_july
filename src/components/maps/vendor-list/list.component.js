import React from 'react';
import { ListItem, Avatar, Text, Divider } from 'react-native-elements'
import {View} from 'react-native';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import { toStationDetails } from '../../../session';
import { useNavigation } from '@react-navigation/native';

const list = [
    {
      name: 'Forte Gas Station',
      avatar_url: 'https://randomuser.me/api/portraits/women/35.jpg',
      subtitle: '21, Lekki-Ajah Express Way',
      distance: '1km', 
      id: 0
    },
    {
      name: 'Peninsula Gas',
      avatar_url: 'https://randomuser.me/api/portraits/women/11.jpg',
      subtitle: '41, Yaba, Lagos',
      distance: '4m', 
      id: 1
    },
    {
      name: 'Peninsula Gas',
      avatar_url: 'https://randomuser.me/api/portraits/women/31.jpg',
      subtitle: '41, Yaba, Lagos',
      distance: '4m', 
      id: 2
    },
    {
      name: 'Peninsula Gas',
      avatar_url: 'https://randomuser.me/api/portraits/women/26.jpg',
      subtitle: '41, Yaba, Lagos',
      distance: '4m', 
      id: 3
    },
]

const VendorList = ({appSettings}) => {
    const navigation = useNavigation();

    const pressedList = () => {
        // alert("Pressed")
        toStationDetails(navigation)
    }

    const renderLeftElement = (avatar) => (
        <View> 
            <Avatar 
                source={{uri: avatar}}
                size='medium'
                // rounded
            />
        </View>
    )
    const renderRightElement = (text) => (
        <View> 
            <Text>{text}</Text>
        </View>
    )

    return (
        <View>
            {
                list.map((l, i) => (
                <ListItem
                    onPress={pressedList}
                    key={l.id}
                >
                    <ListItem.Content right>
                        {renderLeftElement(l.avatar_url)}
                    </ListItem.Content>
                    <ListItem.Content>
                        <ListItem.Title right>
                            {l.name}
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            {l.subtitle}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Content right>
                        {renderRightElement(l.distance)}
                    </ListItem.Content>
                </ListItem>
                ))
            }
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    appSettings: selectAppSettings,
})

export default connect(mapStateToProps)(VendorList)