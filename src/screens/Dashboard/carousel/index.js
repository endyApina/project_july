import React from 'react'; 
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAppSettings } from '../../../redux/settings/settings.selector';
import { SummaryScreenContainer } from './styles';
import DetailsCard from './component/detailscard';

const AdminSummaryScreen = ({}) => {
  return (
    <SummaryScreenContainer>
      <DetailsCard marginRight={"15px"}/>
      <DetailsCard marginLeft={"0px"} bgcolor={'#2dd8ff'} />
    </SummaryScreenContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appSettings: selectAppSettings, 
})

export default connect(mapStateToProps)(AdminSummaryScreen)