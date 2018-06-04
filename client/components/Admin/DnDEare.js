import React from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { List } from 'antd';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}
class DnDEare extends React.Component {
  render() {
    const {
      canDrop,
      isOver,
      connectDropTarget,
      innerElements,
    } = this.props;
    const isActive = canDrop && isOver;

    const isEmpty = (
      <div className="create-calculator__drop-area">
        <div className="create-calculator__drop-area__text">
          {isActive ? 'Release to drop' : 'Drag a box here'}
        </div>
      </div>
    );

    const notEmpty = elements => (
      <div className="create-calculator__drop-area">
        <List
          dataSource={elements}
          renderItem={item => (
            <List.Item>{item}</List.Item>
          )}
        />
      </div>
    );

    return (
      connectDropTarget &&
      connectDropTarget(innerElements.length ? notEmpty(innerElements) : isEmpty));
  }
}

DnDEare.propTypes = {
  innerElements: PropTypes.arrayOf(PropTypes.element).isRequired,
  canDrop: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget('dndelement', {}, collect)(DnDEare);
