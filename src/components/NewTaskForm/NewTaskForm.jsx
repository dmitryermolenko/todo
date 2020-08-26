/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ENTER_BUTTON_KEY_CODE = 13;
const DEFAULT_TIMER = '00';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
      inputMinutes: '',
      inputSeconds: '',
    };
  }

  onInputChange = (evt) => {
    switch (evt.target.id) {
      case 'minutes':
        this.setState({
          inputMinutes: evt.target.value,
        });
        break;
      case 'seconds':
        this.setState({ inputSeconds: evt.target.value });
        break;
      default:
        this.setState({
          inputText: evt.target.value,
        });
    }
  };

  onKeyDown = (evt) => {
    const { onKeyDown } = this.props;
    const { inputText } = this.state;
    let { inputMinutes, inputSeconds } = this.state;

    if (evt.keyCode === ENTER_BUTTON_KEY_CODE) {
      onKeyDown(
        inputText,
        (inputMinutes = inputMinutes || DEFAULT_TIMER),
        (inputSeconds = inputSeconds || DEFAULT_TIMER)
      );
      this.setState({
        inputText: '',
        inputMinutes: '',
        inputSeconds: '',
      });
    }
  };

  render() {
    const { inputText, inputMinutes, inputSeconds } = this.state;
    return (
      <form className="new-todo-form">
        <input
          id="text"
          className="new-todo"
          placeholder="What needs to be done?"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onChange={this.onInputChange}
          onKeyDown={this.onKeyDown}
          value={inputText}
        />
        <input
          id="minutes"
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          onChange={this.onInputChange}
          value={inputMinutes}
        />
        <input
          id="seconds"
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          onChange={this.onInputChange}
          value={inputSeconds}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
};
