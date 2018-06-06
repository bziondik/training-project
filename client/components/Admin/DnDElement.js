import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';


/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

const boxSource = {
  beginDrag(props) {
    return { index: props.index, onDrop: props.onDrop };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const didDrop = monitor.didDrop();
    // const dropResult = monitor.getDropResult();

    // if (dropResult) {
    if (didDrop) {
      console.log(`You dropped ${item.toString()}!`);
      item.onDrop(item.index);
    }
  },
};

class DnDElement extends React.Component {
  render() {
    const { isDragging, connectDragSource } = this.props;
    const { inner, onDrop } = this.props;
    const opacity = isDragging ? 0.6 : 1;

    return (
      connectDragSource &&
      connectDragSource(<div className="create-calculator__drop-element" style={{ opacity }} onDrop={onDrop}>{inner}</div>)
    );
  }
}

DnDElement.propTypes = {
  inner: PropTypes.element.isRequired,
  onDrop: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
};

export default DragSource('dndelement', boxSource, collect)(DnDElement);
