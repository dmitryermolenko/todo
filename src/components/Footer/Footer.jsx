import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from '../TasksFilter/TasksFilter';

const Footer = ({ filterName, onFilterChange, onClearButtonClick, todoCount }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TasksFilter filterName={filterName} onFilterChange={onFilterChange} />
      <button className="clear-completed" type="button" onClick={onClearButtonClick}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  filterName: PropTypes.string.isRequired,
  todoCount: PropTypes.number.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearButtonClick: PropTypes.func.isRequired,
};

export default Footer;
