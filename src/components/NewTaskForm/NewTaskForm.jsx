import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ENTER_BUTTON_KEY_CODE = 13;

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
    };
  }

  onInputTextChange = (evt) => {
    this.setState({
      inputText: evt.target.value,
    });
  };

  onKeyDown = (evt) => {
    const { onKeyDown } = this.props;
    const { inputText } = this.state;
    if (evt.keyCode === ENTER_BUTTON_KEY_CODE) {
      onKeyDown(inputText);
      this.setState({
        inputText: '',
      });
    }
  };

  render() {
    const { inputText } = this.state;
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        onChange={this.onInputTextChange}
        onKeyDown={this.onKeyDown}
        value={inputText}
      />
    );
  }
}

NewTaskForm.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
};
