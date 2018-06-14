import React from 'react';
import { Link } from 'react-router-dom';
import { List, Card, Modal, Icon } from 'antd';
import PropTypes from 'prop-types';

import Calculator from '../Common/Calculator';
import { setCalcDataToLocalStorage } from '../../utils/localStorage';

class ContentTemplatesPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      idSelectTempl: null,
    };
  }
  componentDidMount() {
    this.props.calcsRequest(this.props.me.id);
  }
  showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure delete this template?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: this.deleteTempl,
      onCancel: this.clearSelectedTempl,
    });
  };
  clearSelectedTempl = () => {
    this.setState({ idSelectTempl: null });
  }
  handleOnDelete = (event) => {
    const { id } = event.target.dataset;
    this.setState({ idSelectTempl: id });
    this.showDeleteConfirm();
  };
  deleteTempl = () => {
    this.props.calcDeleteRequest(this.props.me.id, this.state.idSelectTempl.id);
  }
  handleOnEdit = (event) => {
    const { id } = event.target.dataset;
    const template = this.props.templates.find(templ => templ.id === id);
    setCalcDataToLocalStorage(JSON.stringify({
      settings: template.settings,
      formula: template.formula,
    }));
    this.props.history.push('/admin/create');
  }
  render() {
    const {
      templates,
    } = this.props;
    if (templates.length) {
      return (
        <React.Fragment>
          <Link to="/admin/create">Create Template</Link>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={templates}
            renderItem={item => (
              <List.Item>
                <Card
                  title={item.name}
                  actions={[
                    <Icon type="edit" data-id={item.id} onClick={this.handleOnEdit} />,
                    <Icon type="delete" data-id={item.id} onClick={this.handleOnDelete} />,
                  ]}
                >
                  <Calculator settings={item.settings} formula={item.formula} />
                </Card>
              </List.Item>
            )}
          />
        </React.Fragment>
      );
    }
    return <div>No Templates</div>;
  }
}

ContentTemplatesPage.propTypes = {
  templates: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    formula: PropTypes.string,
    createdAt: PropTypes.string,
  })).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  me: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  calcsRequest: PropTypes.func.isRequired,
  calcDeleteRequest: PropTypes.func.isRequired,
};

export default ContentTemplatesPage;
