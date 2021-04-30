import React from 'react'; 
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../../../redux/settings/settings.selector';
import { DetailsContainer, DetailsText, NumberContainer, NumberText, ImageContainer, TextContainer, InnerContainer } from './styles';
import { Image } from 'react-native';

const DetailsCard = ({...otherProps}) => {
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
          <DetailsText>
            {"Details"}
          </DetailsText>
          <DetailsText> 
            {"Orders"}
          </DetailsText>
        </TextContainer>
        <NumberContainer>
            <NumberText> 
              {"200"}
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