import React from 'react'; 
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../redux/settings/settings.selector';
import { DetailsContainer, CylinderText, DetailsText, NumberContainer, NumberText, ImageContainer, TextContainer, InnerContainer } from './styles';
import {Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const OrderTypeCard = ({gasType, cost, onClick, ...otherProps}) => {
  return (
    <DetailsContainer {...otherProps}>
      <InnerContainer>
        <TouchableOpacity
          onPress={onClick}
        > 
          <ImageContainer> 
            <Image 
              source={require("../../../assets/gas-station.png")}
              style={{
                height: 60, 
                width: 60
              }}
            />
          </ImageContainer>
          <TextContainer> 
            <DetailsText>
              {gasType}
            </DetailsText>
            <CylinderText> 
              {"Cylinder"}
            </CylinderText>
          </TextContainer>
          <NumberContainer>
              <NumberText> 
                {cost}
              </NumberText>
          </NumberContainer>
        </TouchableOpacity>
      </InnerContainer>
    </DetailsContainer>
  )
}

OrderTypeCard.propTypes = {
  handlePress: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings, 
})

export default connect(mapStateToProps)(OrderTypeCard)