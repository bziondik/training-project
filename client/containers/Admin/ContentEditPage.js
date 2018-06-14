import { connect } from 'react-redux';

import ContentCreatePageComponent from '../../components/Admin/Builder/DataFromStore';

import { calcCreateRequest, calcGetRequest, calcUpdateRequest } from '../../actions/calculators';
import { getCalc } from '../../reducers/calculators';

const mapStateToProps = state => ({
  me: state.auth.user,
  calc: getCalc(state),
});

const mapDispatchToProps = {
  calcCreateRequest,
  calcGetRequest,
  calcUpdateRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentCreatePageComponent);
