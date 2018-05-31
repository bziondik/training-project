import { connect } from 'react-redux';

import Page from '../../components/Common/Page';

import { getIsLoading } from '../../reducers/network';

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(Page);
