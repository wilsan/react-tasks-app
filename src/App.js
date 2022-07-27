import './App.css';

import { useContext } from 'react';

import Header from './components/header/header.component';
import TaskList from './components/task-list/task-list.component';
import Spinner from './components/spinner/spinner.component';

import { TaskContext } from './contexts/task.context';

function App() {
  const { isLoading } = useContext(TaskContext);

  return (
    <div className="App container-fluid">
      <Header />
      {isLoading ? <Spinner /> : <TaskList />}
    </div>
  );
}

export default App;
