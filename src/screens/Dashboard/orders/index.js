import React from 'react'; 
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import {OrderScreenContainer, OrderText, OrderTextContainer} from './styles';
import OrderHistory from '../../orders';

const OrderSection = ({}) => {
  return (
    <OrderScreenContainer> 
      <OrderTextContainer>
        <OrderText>
          {"Gas Orders"}
        </OrderText>
      </OrderTextContainer>
      <OrderHistory />
    </OrderScreenContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings
})

export default connect(mapStateToProps)(OrderSection)