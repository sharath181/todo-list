import React, { Fragment } from 'react';
import './App.css';

import TodoListComponent from './components/TodoListComponent';
import ListTodo from './components/ListTodo';

function App() {
  return (
    <Fragment>
      <div className='container'>
        <TodoListComponent />
        {/* <ListTodo /> */}
      </div>
    </Fragment>
  );
}

export default App;
