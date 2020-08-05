import React from 'react';
import PropTypes from 'prop-types';
import TaskEditInput from '../TaskEditInput/TaskEditInput';
import TimeIndicator from '../TimeIndicator/TimeIndicator';

const Task = (props) => {
  const {
    id,
    label,
    isCompleted,
    isEditing,
    onDeleteButtonClick,
    onCheckboxToggle,
    onEditButtonClick,
    onLabelEdit,
    onBlur,
  } = props;

  return (
    <li className={`${isCompleted ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onCheckboxToggle} />
        <label>
          <span className="description">{label}</span>
          <TimeIndicator creatingTime={new Date()} />
        </label>
        <button type="button" className="icon icon-edit" onClick={onEditButtonClick} aria-label="edit" />
        <button type="button" className="icon icon-destroy" onClick={onDeleteButtonClick} aria-label="delete" />
      </div>
      {isEditing ? <TaskEditInput label={label} id={id} onBlur={() => onBlur(id)} onLabelEdit={onLabelEdit} /> : null}
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onCheckboxToggle: PropTypes.func.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
  onLabelEdit: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default Task;
