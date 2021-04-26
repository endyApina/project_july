import React from 'react'; 
import PropTypes from 'prop-types';
import { NotificationCardContainer } from './styles'; 
import { ListItem } from 'react-native-elements';
import { SafeAreaView, ScrollView } from 'react-native';

const NotificationCard = ({item, name, description, date, onPress, ...otherProps}) => (
  <NotificationCardContainer {...otherProps}> 
    <ListItem
      containerStyle={{
        borderTopLeftRadius: 15, 
        borderBottomRightRadius: 15, 
        borderTopRightRadius: 15, 
        height: 110, 
        marginTop: 10,
      }}
      onPress={onPress}
      underlayColor="transparent"
    >
      <ListItem.Content> 
        <ListItem.Title
          right
          style={{
            fontSize: 16, 
            paddingBottom: 5, 
          }}
        > 
          {name}
        </ListItem.Title>
        <ListItem.Subtitle
          style={{
            fontSize: 11
          }}
        > 
          {description}
        </ListItem.Subtitle>
        <ListItem.Subtitle
          style={{
            marginTop: 10, 
            paddingTop: 10, 
            fontSize: 11
          }}
        > 
          {date}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem> 
  </NotificationCardContainer>
)

NotificationCard.propTypes = {
  onPress: PropTypes.func,
  date: PropTypes.func
}

export default React.memo(NotificationCard)