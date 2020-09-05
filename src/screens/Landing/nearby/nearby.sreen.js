import * as React from 'react'; 
import VendorList from '../../../components/maps/vendor-list/list.component';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { VendorListContainer } from './nearby.styles';
import { selectAppSettings } from '../../../redux/settings/settings.selector';

const NearbyScreen = ({ appsettings }) => {
  return (
    <VendorListContainer>
      <VendorList />
    </VendorListContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  appsettings: selectAppSettings
})

export default connect(mapStateToProps)(NearbyScreen)