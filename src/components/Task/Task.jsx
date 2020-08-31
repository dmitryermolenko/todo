import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TaskEditInput from '../TaskEditInput/TaskEditInput';
import TimeIndicator from '../TimeIndicator/TimeIndicator';

function Task(props) {
  let { minutesTimer, secondsTimer } = props;
  minutesTimer = Number(minutesTimer);
  secondsTimer = Number(secondsTimer);

  const [timer, setTimer] = useState({ minutes: minutesTimer, seconds: secondsTimer });
  const [timerID, setTimerID] = useState(null);

  let updatedMinutes = Number(timer.minutes);
  let updatedSeconds = Number(timer.seconds);

  useEffect(() => {
    return () => clearInterval(timerID);
  }, [timerID]);

  const updateTimer = () => {
    if (updatedSeconds !== 0) {
      updatedSeconds -= 1;
    } else if (updatedSeconds === 0 && updatedMinutes !== 0) {
      updatedSeconds = 59;
      updatedMinutes -= 1;
    } else {
      clearInterval(timerID);
    }

    return setTimer({ minutes: updatedMinutes, seconds: updatedSeconds });
  };

  const startTimer = () => {
    setTimerID(setInterval(updateTimer, 1000));
  };

  const stopTimer = () => {
    clearInterval(timerID);
  };

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
  } = props;

  return (
    <li className={clsx({ completed: isCompleted }, { editing: isEditing })}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onCheckboxToggle} defaultChecked={!!isCompleted} />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button type="button" className="icon icon-play" aria-label="play" onClick={startTimer} />
            <button type="button" className="icon icon-pause" aria-label="pause" onClick={stopTimer} />
            <p>
              {timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}:
              {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
            </p>
          </span>
          <TimeIndicator creatingTime={creatingTime} />
        </label>
        <button type="button" className="icon icon-edit" onClick={onEditButtonClick} aria-label="edit" />
        <button type="button" className="icon icon-destroy" onClick={onDeleteButtonClick} aria-label="delete" />
      </div>
      {isEditing ? <TaskEditInput label={label} id={id} onBlur={() => onBlur(id)} onLabelEdit={onLabelEdit} /> : null}
    </li>
  );
}

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
