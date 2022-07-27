import { ReactComponent as DropdownIcon } from '../../assets/menu-down.svg';
import { ReactComponent as AddIcon } from '../../assets/plus-square-dotted.svg';
import TaskForm from '../task-form/task-form.component';
import ChildTaskList from '../childtask-list/childtask-list.component';

import { useState, useEffect } from 'react';

function Task({ task }) {
   const [toggleButton, setToggleButton] = useState(false);
   const date = new Date(task.due);

   useEffect(() => {
      const childTasksCollapsible = document.getElementById(`collapseChildTask-${task.id}`);

      childTasksCollapsible && childTasksCollapsible.addEventListener('hide.bs.collapse', event => {
         const childTaskForm = document.getElementById(`collapseNewTask-${task.id}`);
         childTaskForm.className = 'collapse';
         setToggleButton(false);
      });
   });

   return (
      <div className="card rounded-1 mt-2 border border-4">
         <div className="card-body d-flex justify-content-between align-items-center">
            <span className='fs-5 fw-bolder'>{task.title}</span>
            <div className='d-flex align-items-center'>
               <span className='date text-muted'>{date.toDateString()}</span>
               <div className='icon-container d-flex justify-content-end'>
                  <a className="btn btn-link" data-bs-toggle="collapse" href={`#collapseChildTask-${task.id}`}>
                     <DropdownIcon className="dropdown-icon" />
                  </a>
               </div>
            </div>
         </div>

         <div className="collapse" id={`collapseChildTask-${task.id}`}>
            <div className="card rounded-1 m-3 mt-0 border border-2">
               {task.child_tasks && <ChildTaskList childTasks={task.child_tasks} />}

               <a onClick={() => setToggleButton(!toggleButton)} className="btn btn-link me-auto ms-1" data-bs-toggle="collapse" href={`#collapseNewTask-${task.id}`}>
                  {toggleButton ?
                     'Close' :
                     <div className='d-flex'>
                        <AddIcon className="add-icon" />
                        <span className='ms-2'>Add child task</span>
                     </div>}
               </a>
            </div>
         </div>

         <div className="collapse" id={`collapseNewTask-${task.id}`}>
            <div className="card rounded-1 card-body m-3 mt-0">
               <TaskForm parentTask={task.id} />
            </div>
         </div>
      </div>
   );
}

export default Task;