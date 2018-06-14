import { connect } from 'react-redux';

import ContentCreatePageComponent from '../../components/Admin/Builder/DataFromLS';

import { calcCreateRequest } from '../../actions/calculators';

const mapStateToProps = state => ({
  me: state.auth.user,
});

const mapDispatchToProps = {
  calcCreateRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentCreatePageComponent);
