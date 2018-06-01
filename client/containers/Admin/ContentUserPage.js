import { connect } from 'react-redux';

import ContentUserPageComponent from '../../components/Admin/ContentUserPage';

import { getIsAuthorized } from '../../reducers/auth';
import { userGetRequest } from '../../actions/users';

const mapStateToProps = state => ({
  users: state.users,
  me: state.auth.user,
  isAuthorized: getIsAuthorized(state),
});

const mapDispatchToProps = {
  userGetRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentUserPageComponent);
