import { Fragment, useState } from 'react';

import TaskForm from '../task-form/task-form.component';

function Header() {
   const [buttonToggle, setButtonToggle] = useState(false);

   return (
      <Fragment>
         <div className='titlebar d-flex justify-content-between align-items-center'>
            <h1 className='display-6'>My Tasks</h1>
            <div>
               <button
                  type="button"
                  onClick={() => setButtonToggle(!buttonToggle)}
                  className={buttonToggle ? 'btn btn-danger btn-sm' : 'btn btn-light btn-sm'}
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
               >
                  {buttonToggle ? 'Close' : 'Add Task'}
               </button>
            </div>
         </div>

         <div className="collapse mb-2" id="collapseExample">
            <div className="card card-body pb-0">
               <div className="mb-3">
                  <TaskForm parentTask={null} />
               </div>
            </div>
         </div>
      </Fragment>
   );
}

export default Header;