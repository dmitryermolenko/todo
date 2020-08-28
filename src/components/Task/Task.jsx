import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TaskEditInput from '../TaskEditInput/TaskEditInput';
import TimeIndicator from '../TimeIndicator/TimeIndicator';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutesTimer: props.minutesTimer,
      secondsTimer: props.secondsTimer,
    };

    this.timerID = null;
  }

  componentWillUnmount = () => {
    clearInterval(this.timerID);
  };

  startTimer = () => {
    if (!this.timerID) {
      this.timerID = setInterval(this.updateTimer, 1000);
    }
  };

  updateTimer = () => {
    let { minutesTimer, secondsTimer } = this.state;
    minutesTimer = Number(minutesTimer);
    secondsTimer = Number(secondsTimer);
    if (secondsTimer) {
      secondsTimer -= 1;
    } else if (!secondsTimer && minutesTimer) {
      secondsTimer = 59;
      minutesTimer -= 1;
    } else {
      clearInterval(this.timerID);
    }

    this.setState(() => {
      const minutes = this.transformTimer(minutesTimer);
      const seconds = this.transformTimer(secondsTimer);

      return {
        minutesTimer: minutes,
        secondsTimer: seconds,
      };
    });
  };

  pauseTimer = () => {
    clearInterval(this.timerID);
    this.timerID = null;
  };

  // добавить допольнительный 0, если число однозначное
  transformTimer = (value) => {
    let timerValue = value;

    if (timerValue < 10) {
      timerValue = `0${timerValue}`;
    }
    return timerValue;
  };

  render() {
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
    } = this.props;

    const { minutesTimer, secondsTimer } = this.state;
    return (
      <li className={clsx({ completed: isCompleted }, { editing: isEditing })}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onCheckboxToggle} checked={!!isCompleted} />
          <label>
            <span className="title">{label}</span>
            <span className="description">
              <button type="button" className="icon icon-play" aria-label="play" onClick={this.startTimer} />
              <button type="button" className="icon icon-pause" aria-label="pause" onClick={this.pauseTimer} />
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
  }
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
