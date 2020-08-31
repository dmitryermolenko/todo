import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TaskEditInput(props) {
  const { label } = props;
  const [editedLabel, setEditedLabel] = useState(label);

  const onInputTextChange = (evt) => {
    setEditedLabel(evt.target.value);
  };

  const onKeyPress = (evt) => {
    const { id, onLabelEdit } = props;
    if (evt.key === 'Enter') {
      onLabelEdit(id, editedLabel);
    }
  };

  const { onBlur } = props;
  return (
    <input
      type="text"
      className="edit"
      onKeyPress={(evt) => onKeyPress(evt)}
      onBlur={onBlur}
      onChange={onInputTextChange}
      value={editedLabel}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus
    />
  );
}

TaskEditInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onLabelEdit: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default TaskEditInput;
