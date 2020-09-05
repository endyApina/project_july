import * as React from 'react'; 
import { View, Text, Image } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import { connect } from 'react-redux';

const ImageHeader = ({appSettings}) => {
  return (
    <View 
      style={{flex: 1, alignItems: "center"}}    
    >
      <View
        style={{backgroundColor: "#eee", borderRadius: 10, overflow: "hidden"}}
      > 
        <View> 
          <Image 
            source={require("../../../../assets/station.jpg")}
            style={{
              height: 250, 
              width: 400
            }}
          />
        </View>
      </View>
    </View>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings
})

export default connect(mapStateToProps)(ImageHeader)