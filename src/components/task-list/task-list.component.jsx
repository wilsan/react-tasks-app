import { Fragment, useContext } from 'react';

import './task-list.styles.css';

import Task from '../task/task.component';

import { TaskContext } from '../../contexts/task.context';

function TaskList() {
   const { mainTasks } = useContext(TaskContext);
   return (
      <Fragment>
         {mainTasks && mainTasks.map(task =>
            <Task task={task} key={task.id} />
         )}
      </Fragment>
   );
}

export default TaskList;
