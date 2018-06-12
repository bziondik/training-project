import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Modal } from 'antd';
import PropTypes from 'prop-types';

class ContentCalcsPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedCalc: null,
    };
  }
  componentDidMount() {
    this.props.calcsRequest(this.props.me.id);
  }
  showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure delete this calculator?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: this.deleteCalc,
      onCancel: this.clearSelectedCalc,
    });
  };
  clearSelectedCalc = () => {
    this.setState({ selectedCalc: null });
  }

  handleCalcDelete = (record) => {
    console.log(record);
    this.setState({ selectedCalc: record });
    this.showDeleteConfirm();
  };
  deleteCalc = () => {
    this.props.calcDeleteRequest(this.props.me.id, this.state.selectedCalc.id);
  }
  render() {
    const {
      calcs,
    } = this.props;
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => <Link to={`/admin/calc/${record.id}`}>{text}</Link>,
    }, {
      title: 'Formula',
      dataIndex: 'formula',
    }, {
      title: 'Registered At',
      dataIndex: 'createdAt',
      render: timestamp => (new Date(timestamp)).toLocaleDateString(),
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        const handelClickDelete = () => {
          this.handleCalcDelete(record);
        };
        return (
          <React.Fragment>
            <Button shape="circle" onClick={handelClickDelete} icon="delete" />
          </React.Fragment>
        );
      },
    }];
    console.log('calcs =', calcs);
    if (calcs.length) {
      return (
        <React.Fragment>
          <Link to="/admin/create">Create Calculator</Link>
          <Table rowKey="id" columns={columns} dataSource={calcs} />
        </React.Fragment>
      );
    }
    return null;
  }
}

ContentCalcsPage.propTypes = {
  calcs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    formula: PropTypes.string,
    createdAt: PropTypes.string,
  })).isRequired,
  me: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  calcsRequest: PropTypes.func.isRequired,
  calcDeleteRequest: PropTypes.func.isRequired,
};

export default ContentCalcsPage;
