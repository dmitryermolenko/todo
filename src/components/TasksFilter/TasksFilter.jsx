import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

function TasksFilter(props) {
  const buttons = useMemo(() => {
    return [
      { name: 'all', label: 'All' },
      { name: 'active', label: 'Active' },
      { name: 'completed', label: 'Completed' },
    ];
  }, []);

  const { filterName, onFilterChange } = props;
  const btns = buttons.map((button) => {
    const { name, label } = button;
    return (
      <li key={name}>
        <button type="button" className={filterName === name ? 'selected' : ''} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });
  return <ul className="filters">{btns}</ul>;
}

TasksFilter.propTypes = {
  filterName: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default TasksFilter;
