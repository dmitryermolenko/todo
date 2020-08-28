/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_TIMER = '00';

function NewTaskForm(props) {
  const [todoTitle, setTodoTitle] = useState('');
  const [minutesTimer, setMinutesTimer] = useState('');
  const [secondsTimer, setSecondsTimer] = useState('');

  const checkTimerFormat = (value, inputID) => {
    let timerValue = null;

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(value))) {
      timerValue = '';
    } else if (inputID === 'seconds' && Number(value) > 59) {
      timerValue = '';
    } else {
      timerValue = value;
    }

    return timerValue;
  };

  const changeInput = (evt) => {
    switch (evt.target.id) {
      case 'minutes':
        setMinutesTimer(checkTimerFormat(evt.target.value, evt.target.id));
        break;
      case 'seconds':
        setSecondsTimer(checkTimerFormat(evt.target.value, evt.target.id));
        break;
      default:
        setTodoTitle(evt.target.value);
    }
  };

  const addTask = (evt) => {
    const { onKeyPress } = props;

    if (evt.key === 'Enter') {
      onKeyPress(todoTitle, minutesTimer || DEFAULT_TIMER, secondsTimer || DEFAULT_TIMER);

      setTodoTitle('');
      setMinutesTimer('');
      setSecondsTimer('');
    }
  };

  return (
    <form className="new-todo-form">
      <input
        id="text"
        className="new-todo"
        placeholder="What needs to be done?"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        onChange={changeInput}
        onKeyPress={addTask}
        value={todoTitle}
      />
      <input
        id="minutes"
        className="new-todo-form__timer"
        placeholder="Min"
        autoFocus
        onChange={changeInput}
        value={minutesTimer}
      />
      <input
        id="seconds"
        className="new-todo-form__timer"
        placeholder="Sec"
        autoFocus
        onChange={changeInput}
        value={secondsTimer}
      />
    </form>
  );
}

NewTaskForm.propTypes = {
  onKeyPress: PropTypes.func.isRequired,
};

export default NewTaskForm;
