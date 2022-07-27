import { useState, useContext } from "react";

import { TaskContext } from "../../contexts/task.context";

const defaultFormFields = {
   title: '',
   due: '',
   parent_task: null
};

function TaskForm({ parentTask }) {
   const [formFields, setFormFields] = useState(defaultFormFields);
   const { title, due } = formFields;
   const { postNewTask } = useContext(TaskContext);

   const resetFormFields = () => {
      setFormFields(defaultFormFields);
   };

   const handleChange = (event) => {
      const { name, value } = event.target;
      setFormFields({ ...formFields, [name]: value, parent_task: parentTask });
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      postNewTask(formFields);
      resetFormFields();
   };

   return (
      <form action="" onSubmit={handleSubmit}>
         <label htmlFor="task-title" className="form-label">Title:</label>
         <input name="title" value={title} onChange={handleChange} type="text" className="form-control mb-2" id="task-title" />
         <label htmlFor="task-date" className="form-label">Due date:</label>
         <div className='d-flex align-items-center'>
            <input name="due" value={due} onChange={handleChange} type="date" className="form-control w-25" id="task-date" />
            <button type="submit" className="btn btn-primary w-25 ms-auto">{parentTask ? 'Add Child Task' : 'Add'}</button>
         </div>
      </form>
   );
}

export default TaskForm;
