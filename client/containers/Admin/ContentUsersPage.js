import { connect } from 'react-redux';

import ContentUsersPageComponent from '../../components/Admin/ContentUsersPage';

import { getIsAuthorized } from '../../reducers/auth';
import {
  usersRequest,
  userGetRequest,
  userCreateRequest,
  userUpdateRequest,
  userDeleteRequest,
} from '../../actions/users';

const mapStateToProps = state => ({
  users: state.users,
  me: state.auth.user,
  isAuthorized: getIsAuthorized(state),
});

const mapDispatchToProps = {
  usersRequest,
  userGetRequest,
  userCreateRequest,
  userUpdateRequest,
  userDeleteRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentUsersPageComponent);
