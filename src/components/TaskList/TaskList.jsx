import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task/Task';

const TaskList = ({ todos, onDeleteButtonClick, onCheckboxToggle, onEditButtonClick, onLabelEdit, onBlur }) => {
  const elements = todos.map((item) => {
    const { id } = item;
    return (
      <Task
        key={id}
        {...item}
        onDeleteButtonClick={() => onDeleteButtonClick(id)}
        onCheckboxToggle={() => onCheckboxToggle(id)}
        onEditButtonClick={() => onEditButtonClick(id)}
        onLabelEdit={onLabelEdit}
        onBlur={onBlur}
      />
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onCheckboxToggle: PropTypes.func.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
  onLabelEdit: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default TaskList;
