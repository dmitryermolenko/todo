import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TaskEditInput from '../TaskEditInput/TaskEditInput';
import TimeIndicator from '../TimeIndicator/TimeIndicator';

const Task = (props) => {
  const {
    id,
    label,
    creatingTime,
    isCompleted,
    isEditing,
    onDeleteButtonClick,
    onCheckboxToggle,
    onEditButtonClick,
    onLabelEdit,
    onBlur,
    minutesTimer,
    secondsTimer,
  } = props;

  return (
    <li className={clsx({ completed: isCompleted }, { editing: isEditing })}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onCheckboxToggle} checked={!!isCompleted} />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button type="button" className="icon icon-play" aria-label="play" />
            <button type="button" className="icon icon-pause" aria-label="pause" />
            <p>{`${minutesTimer}:${secondsTimer}`}</p>
          </span>
          <TimeIndicator creatingTime={creatingTime} />
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
  creatingTime: PropTypes.instanceOf(Date).isRequired,
  isCompleted: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onCheckboxToggle: PropTypes.func.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
  onLabelEdit: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  minutesTimer: PropTypes.string.isRequired,
  secondsTimer: PropTypes.string.isRequired,
};

export default Task;
