import { connect } from 'react-redux';

import ContentUserPageComponent from '../../components/Admin/ContentUsersPage';

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
  isAuthorized: getIsAuthorized(state),
});

const mapDispatchToProps = {
  usersRequest,
  userGetRequest,
  userCreateRequest,
  userUpdateRequest,
  userDeleteRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentUserPageComponent);
