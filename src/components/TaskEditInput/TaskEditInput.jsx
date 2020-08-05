import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TaskEditInput extends Component {
  constructor(props) {
    super();
    this.state = {
      editedLabel: props.label,
    };
  }

  onInputTextChange = (evt) => {
    this.setState({
      editedLabel: evt.target.value,
    });
  };

  onKeyDown = (evt) => {
    const { id, onLabelEdit } = this.props;
    const { editedLabel } = this.state;
    if (evt.keyCode === 13) {
      onLabelEdit(id, editedLabel);
    }
  };

  render() {
    const { onBlur } = this.props;
    const { editedLabel } = this.state;
    return (
      <input
        type="text"
        className="edit"
        onKeyDown={(evt) => this.onKeyDown(evt)}
        onBlur={onBlur}
        onChange={this.onInputTextChange}
        value={editedLabel}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
    );
  }
}

TaskEditInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onLabelEdit: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};
