// --- Core ---
import { useSession } from "next-auth/react";
import React, { createContext, useState } from "react";
import TaskComponent from "./TaskComponent";
import { getUserID } from '../../lib/user'
import useTasks, { TasksContext, useTasksContext } from "../../lib/hooks/useTasks";
import { DialogForm } from "./DialogForm";
import { Task } from "../../types/interfaces/Task";

type TaskListProps = {
  access: Task['status']['access'],
}

const TaskList = function ({ access }: TaskListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultFormValues, setDefaultFormValues] = useState<Task | undefined>(undefined);


  // TODO SWRconfing wrapper - or not

  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4 items-stretch">
          <TasksContext.Provider value={{
            type: 'edit',
            access: access,
            message: {
              title: 'Edit Task',
              success: "Successfully edited.",
              error: "Could not edit Task.",
            },
            form: {
              isOpen, setIsOpen, defaultFormValues, setDefaultFormValues
            }
          }}>
            <TaskListContent />
          </TasksContext.Provider>
        </div>
      </div>
    </>
  )
}

const TaskListContent = () => {
  const { data: session, status } = useSession();
  const { tasks, isError, isLoading } = useTasks();
  return (
    <>
      {!isError && !isLoading &&
        tasks.map((taskData) => {
          return (<TaskComponent key={taskData.id} data={taskData} userID={session ? getUserID(session) : ""} />)
        })
      }
      <DialogForm />
    </>
  )
}

export default TaskList;