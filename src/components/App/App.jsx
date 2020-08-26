import React, { Component } from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

export default class App extends Component {
  constructor() {
    super();
    this.id = 4;
    this.state = {
      todoData: [
        {
          id: 1,
          label: 'Drink Coffee',
          isCompleted: false,
          isEditing: false,
          creatingTime: new Date(),
          minutesTimer: '01',
          secondsTimer: '30',
        },
        {
          id: 2,
          label: 'Drink Tee',
          isCompleted: false,
          isEditing: false,
          creatingTime: new Date(),
          minutesTimer: '01',
          secondsTimer: '00',
        },
        {
          id: 3,
          label: 'Drink Milk',
          isCompleted: false,
          isEditing: false,
          creatingTime: new Date(),
          minutesTimer: '00',
          secondsTimer: '30',
        },
      ],
      filterName: 'all',
    };
  }

  /* удалить задачу */
  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const todoDataCopy = todoData.filter((el) => el.id !== id);

      return {
        todoData: todoDataCopy,
      };
    });
  };

  /* добавить задачу */
  addTask = (text, minutes, seconds) => {
    const newTask = {
      // eslint-disable-next-line no-plusplus
      id: this.id++,
      label: text,
      isCompleted: false,
      isEditing: false,
      creatingTime: new Date(),
      minutesTimer: minutes,
      secondsTimer: seconds,
    };

    this.setState(({ todoData }) => {
      const todoDataCopy = [...todoData, newTask];

      return {
        todoData: todoDataCopy,
      };
    });
  };

  /* обновить данные */
  getUpdatedTasks = (id, arr, propName) => {
    return arr.map((el) => (el.id === id ? { ...el, [propName]: !el[propName] } : el));
  };

  /* показать/скрыть поле ввода для редактирования */
  toggleEditMode = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.getUpdatedTasks(id, todoData, 'isEditing'),
      };
    });
  };

  /* отметить задачу как выполненная */
  toggleCompletedStatus = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.getUpdatedTasks(id, todoData, 'isCompleted'),
      };
    });
  };

  /* показать отфильтрованные задачи */
  filterTasks = (tasks, filterName) => {
    switch (filterName) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter((task) => /* !task.isCompleted */ task.isCompleted === false);
      case 'completed':
        return tasks.filter((task) => task.isCompleted);
      default:
        return tasks;
    }
  };

  /* отобразать активный фильтр */
  onFilterChange = (filterName) => {
    this.setState(() => ({ filterName }));
  };

  /* очистить все завершенные задачи */
  clearCompletedTasks = () => {
    this.setState(({ todoData }) => {
      const updatedTodoData = todoData.filter((task) => !task.isCompleted);

      return {
        todoData: updatedTodoData,
      };
    });
  };

  /* редактировать задачу */
  editLabel = (id, text) => {
    this.setState(({ todoData }) => {
      const updatedTodoData = todoData.map((el) =>
        el.id === id ? { ...el, label: text, isEditing: !el.isEditing } : el
      );

      return {
        todoData: updatedTodoData,
      };
    });
  };

  render() {
    const { todoData, filterName } = this.state;
    const filteredTasks = this.filterTasks(todoData, filterName);
    const todoCount = todoData.filter((task) => !task.isCompleted).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onKeyDown={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            todos={filteredTasks}
            onDeleteButtonClick={this.deleteTask}
            onCheckboxToggle={this.toggleCompletedStatus}
            onEditButtonClick={this.toggleEditMode}
            onLabelEdit={this.editLabel}
            onBlur={this.toggleEditMode}
          />
          <Footer
            filterName={filterName}
            onFilterChange={this.onFilterChange}
            onClearButtonClick={this.clearCompletedTasks}
            todoCount={todoCount}
          />
        </section>
      </section>
    );
  }
}
