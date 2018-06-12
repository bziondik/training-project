import { connect } from 'react-redux';

import ContentTemplatesPageComponent from '../../components/Admin/ContentTemplatesPage';

import { getTemplates } from '../../reducers/calculators';
import {
  calcsRequest,
  calcDeleteRequest,
} from '../../actions/calculators';

const mapStateToProps = state => ({
  templates: getTemplates(state),
  me: state.auth.user,
});

const mapDispatchToProps = {
  calcsRequest,
  calcDeleteRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentTemplatesPageComponent);
