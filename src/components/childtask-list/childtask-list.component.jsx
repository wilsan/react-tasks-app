function ChildTaskList({ childTasks }) {

   return (
      <ul className="list-group list-group-flush">
         {childTasks.map(task => {
            const date = new Date(task.due);
            return (
               <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{task.title}</span>
                  <span className="date text-muted">{date.toDateString()}</span>
               </li>
            )
         }
         )}
      </ul>
   )
}

export default ChildTaskList
