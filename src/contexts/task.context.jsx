import { createContext, useEffect, useState } from "react";

function postTask(task) {
   return fetch("http://3.95.225.208/api/tasks/", {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
         'Content-type': 'application/json',
      }
   });
}

function getTasks() {
   return new Promise((resolve, reject) => {
      fetch("http://3.95.225.208/api/tasks/")
         .then(res => res.json())
         .then(tasks => {
            const mainTasks = tasks
               .filter(task => task.parent_task === null)
               .map(item => ({ ...item, child_tasks: [] }));

            for (let task of tasks) {
               if (task.parent_task !== null) {
                  const index = mainTasks.findIndex(item => item.id === task.parent_task);
                  (index !== -1) && mainTasks[index]['child_tasks']?.push(task);
               }
            }

            resolve(mainTasks);
         });
   });
}

export const TaskContext = createContext({
   mainTasks: null,
   isLoading: null,
   postNewTask: () => null
});

export const TaskProvider = ({ children }) => {
   const [mainTasks, setMainTasks] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      setIsLoading(true);

      getTasks()
         .then((res) => {
            setMainTasks(res);
            setIsLoading(false);
         });
   }, []);

   const postNewTask = (task) => {
      postTask(task)
         .then((response) => {
            getTasks()
               .then((res) => {
                  setMainTasks(res);
               });
         });
   }

   const value = { mainTasks, postNewTask, isLoading };
   return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
