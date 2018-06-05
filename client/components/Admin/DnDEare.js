import React from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

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
      isEmpty,
      innerElements,
    } = this.props;
    const isActive = canDrop && isOver;

    const isEmptyRender = (
      <div className="create-calculator__drop-area">
        <div className="create-calculator__drop-area__text">
          {isActive ? 'Release to drop' : 'Drag a box here'}
        </div>
      </div>
    );

    const notEmpty = elements => (
      <div className="create-calculator__drop-area">
        {elements}
      </div>
    );

    return (
      connectDropTarget &&
      connectDropTarget(isEmpty ? isEmptyRender : notEmpty(innerElements)));
  }
}

DnDEare.propTypes = {
  isEmpty: PropTypes.bool.isRequired,
  innerElements: PropTypes.element.isRequired,
  canDrop: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget('dndelement', {}, collect)(DnDEare);
