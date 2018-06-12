import { connect } from 'react-redux';

import ContentCalcsPageComponent from '../../components/Admin/ContentCalcsPage';

import { getCalculators } from '../../reducers/calculators';
import {
  calcsRequest,
  calcDeleteRequest,
} from '../../actions/calculators';

const mapStateToProps = state => ({
  calcs: getCalculators(state),
  me: state.auth.user,
});

const mapDispatchToProps = {
  calcsRequest,
  calcDeleteRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentCalcsPageComponent);
