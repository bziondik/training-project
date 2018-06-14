import { connect } from 'react-redux';

import ContentCalcPageComponent from '../../components/Admin/ContentCalcPage';

import { calcGetRequest } from '../../actions/calculators';
import { getCalc } from '../../reducers/calculators';

const mapStateToProps = state => ({
  me: state.auth.user,
  calc: getCalc(state),
});

const mapDispatchToProps = {
  calcGetRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentCalcPageComponent);
