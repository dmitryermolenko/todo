import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  constructor() {
    super();
    this.buttons = [
      { name: 'all', label: 'All' },
      { name: 'active', label: 'Active' },
      { name: 'completed', label: 'Completed' },
    ];
  }

  render() {
    const { filterName, onFilterChange } = this.props;
    const buttons = this.buttons.map((button) => {
      const { name, label } = button;
      return (
        <li key={name}>
          <button type="button" className={filterName === name ? 'selected' : ''} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });
    return <ul className="filters">{buttons}</ul>;
  }
}

TasksFilter.propTypes = {
  filterName: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
