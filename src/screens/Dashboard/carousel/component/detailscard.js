import React from 'react'; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../../../redux/settings/settings.selector';
import { DetailsContainer, DetailsText, NumberContainer, NumberText, ImageContainer, TextContainer, InnerContainer } from './styles';
import { Image, Pressable } from 'react-native';

const DetailsCard = ({orderNumber, status, txtcolor,  ...otherProps}) => {
  return (
      <DetailsContainer {...otherProps}>
      <InnerContainer>
        <ImageContainer> 
          <Image 
            source={require("../../../../../assets/gas-station.png")}
            style={{
              height: 60, 
              width: 60
            }}
          />
        </ImageContainer>
        <TextContainer> 
          <DetailsText txtcolor={txtcolor}>
            {status}
          </DetailsText>
          <DetailsText txtcolor={txtcolor}> 
            {"Orders"}
          </DetailsText>
        </TextContainer>
        <NumberContainer>
            <NumberText txtcolor={txtcolor}> 
              {orderNumber}
            </NumberText>
        </NumberContainer>
      </InnerContainer>
    </DetailsContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings, 
})

export default connect(mapStateToProps)(DetailsCard)