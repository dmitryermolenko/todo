import React, { Component } from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

export default class App extends Component {
  constructor() {
    super();
    this.id = 0;
    this.state = {
      todoData: [
        { id: 15, label: 'Drink Coffee', isCompleted: false, isEditing: false },
        { id: 25, label: 'Drink Tee', isCompleted: false, isEditing: false },
        { id: 35, label: 'Drink Milk', isCompleted: false, isEditing: false },
      ],
      filterName: 'all',
    };
  }

  /* удалить задачу */
  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const todoDataCopy = [...todoData];

      const idx = todoDataCopy.findIndex((el) => el.id === id);
      todoDataCopy.splice(idx, 1);

      return {
        todoData: todoDataCopy,
      };
    });
  };

  /* добавить задачу */
  addTask = (text) => {
    const newTask = {
      id: this.id + 1,
      label: text,
      isCompleted: false,
      isEditing: false,
    };

    this.setState(({ todoData }) => {
      const todoDataCopy = [...todoData, newTask];

      return {
        todoData: todoDataCopy,
      };
    });
  };

  toggleProperty = (id, arr, propName) => {
    const idx = arr.findIndex((el) => el.id === id);

    const oldTask = arr[idx];
    const updatedTask = { ...oldTask, [propName]: !oldTask[propName] };

    return [...arr.slice(0, idx), updatedTask, ...arr.slice(idx + 1)];
  };

  /* показать/скрыть поле ввода для редактирования */
  toggleEditMode = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(id, todoData, 'isEditing'),
      };
    });
  };

  /* отметить задачу как выполненная */
  toggleCompletedStatus = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(id, todoData, 'isCompleted'),
      };
    });
  };

  /* показать отфильтрованные задачи */
  filterTasks = (tasks, filterName) => {
    switch (filterName) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter((task) => !task.isCompleted);
      case 'completed':
        return tasks.filter((task) => task.isCompleted);
      default:
        return tasks;
    }
  };

  /* отобразать активный фильтр */
  onFilterChange = (filterName) => {
    this.setState({ filterName });
  };

  /* очистить все завершенные задачи */
  clearCompletedTasks = () => {
    this.setState(({ todoData }) => {
      const uncompletedTasks = todoData.filter((task) => !task.isCompleted);

      const updatedTodoData = [...uncompletedTasks];

      return {
        todoData: updatedTodoData,
      };
    });
  };

  /* редактировать задачу */
  editLabel = (id, text) => {
    this.setState(({ todoData }) => {
      const updatedTodoData = this.toggleProperty(id, todoData, 'isEditing');

      const updatedTask = updatedTodoData.find((task) => task.id === id);
      updatedTask.label = text;

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
