import React, { useState } from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

function App() {
  const [taskID, setTaskID] = useState(4);

  const [todoData, setTodoData] = useState([
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
  ]);

  const [filterName, setFilterName] = useState('all');

  /* удалить задачу */
  const deleteTask = (id) => {
    setTodoData((prevTodoData) => prevTodoData.filter((el) => el.id !== id));
  };

  /* добавить задачу */
  const addTask = (text, minutes, seconds) => {
    const newTask = {
      // eslint-disable-next-line no-plusplus
      id: taskID,
      label: text,
      isCompleted: false,
      isEditing: false,
      creatingTime: new Date(),
      minutesTimer: minutes,
      secondsTimer: seconds,
    };

    setTodoData((prevTodoData) => {
      return [...prevTodoData, newTask];
    });
    setTaskID((prev) => prev + 1);
  };

  /* обновить данные */
  const getUpdatedTasks = (id, arr, propName) => {
    return arr.map((el) => (el.id === id ? { ...el, [propName]: !el[propName] } : el));
  };

  /* показать/скрыть поле ввода для редактирования */
  const toggleEditMode = (id) => {
    setTodoData((prevTodoData) => getUpdatedTasks(id, prevTodoData, 'isEditing'));
  };

  /* отметить задачу как выполненная */
  const toggleCompletedStatus = (id) => {
    setTodoData((prevTodoData) => getUpdatedTasks(id, prevTodoData, 'isCompleted'));
  };

  /* показать отфильтрованные задачи */
  const filterTasks = (tasks, filter) => {
    switch (filter) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter((task) => task.isCompleted === false);
      case 'completed':
        return tasks.filter((task) => task.isCompleted);
      default:
        return tasks;
    }
  };

  /* отобразать активный фильтр */
  const changeFilter = (filter) => {
    setFilterName(() => filter);
  };

  /* очистить все завершенные задачи */
  const clearCompletedTasks = () => {
    setTodoData((prevTodoData) => prevTodoData.filter((task) => !task.isCompleted));
  };

  /* редактировать задачу */
  const editLabel = (id, text) => {
    setTodoData((prevTodoData) => {
      const updatedTodoData = prevTodoData.map((el) =>
        el.id === id ? { ...el, label: text, isEditing: !el.isEditing } : el
      );

      return updatedTodoData;
    });
  };

  const filteredTasks = filterTasks(todoData, filterName);
  const todoCount = todoData.filter((task) => !task.isCompleted).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onKeyPress={addTask} />
      </header>
      <section className="main">
        <TaskList
          todos={filteredTasks}
          onDeleteButtonClick={deleteTask}
          onCheckboxToggle={toggleCompletedStatus}
          onEditButtonClick={toggleEditMode}
          onLabelEdit={editLabel}
          onBlur={toggleEditMode}
        />
        <Footer
          filterName={filterName}
          onFilterChange={changeFilter}
          onClearButtonClick={clearCompletedTasks}
          todoCount={todoCount}
        />
      </section>
    </section>
  );
}

export default App;
