// --- Core ---
import React from "react";
import { useState } from "react";
import useTasks, { useTasksContext } from "../../lib/hooks/useTasks";
import { Task } from "../../types/interfaces/Task";
import SetStatusbtn from './SetStatusbtn';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { distanceCategory, distanceToNow } from '../../lib/dateRelative'


type TaskComponentProps = {
    data: Task,
    userID: string,
}

const TaskComponent = function ({ data, userID }: TaskComponentProps) {
    const { onDelete, bringForm } = useTasks();
    const { access } = useTasksContext();

    return (
        <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
            <article className="flex flex-col h-full bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                <TaskComponentStatus task={data} userID={userID} />
                <div className="p-4 flex-grow">

                    <h2 className="mt-2 mb-2 px-2 border-b font-bold">{data.content.headline}</h2>
                    <p className="text-sm">{data.content.content}</p>

                </div>
                <div className="p-4 flex border-t items-center text-sm text-gray-600">
                    <span
                        className="inline-block px-2 py-1 leading-none bg-yellow-200 text-yellow-800 rounded-full font-semibold tracking-wide text-xs"
                        title={`task id`}
                    >
                        {data.id}
                    </span>
                    <div className="flex-grow"></div>
                    {data.ownerID == userID && <button
                        title="edit task"
                        className="px-2 flex items-center rounded-full hover:bg-gray-200"
                        onClick={(e) => { bringForm(data) }}
                    >
                        <MdEdit size={'21px'} />
                    </button>}
                    {data.ownerID == userID &&
                        <button
                            title="delete task"
                            className="px-2 flex items-center rounded-full hover:bg-gray-200"
                            onClick={(e) => { onDelete(data) }}
                        >
                            <MdDeleteForever size={'21px'} />
                        </button>}
                </div>
            </article>
        </div>
    )
}

type ColorTheme = {
    bg: string,
    text: string,
}

type TaskComponentStatusProps = {
    task: Task,
    userID: string,
}
// const TaskComponentStatus = ({ completed, access }: Task['status']) => {
const TaskComponentStatus = ({ task, userID }: TaskComponentStatusProps) => {
    // TODO SWRconfig wrapper
    const { setCompletedStatus } = useTasks();
    // const [_completed, setCompleted] = useState(task.status.completed);
    // const _completed = completed;

    const ColorThemes: Record<Task['status']['access'], ColorTheme> = {
        private: {
            bg: "bg-yellow-200",
            text: "text-yellow-800",
        },
        public: {
            bg: "bg-green-400",
            text: "text-green-800",
        }
    }
    return (
        <aside className="flex items-center justify-between">
            {
                task.exiprationTimestamp &&
                <div
                    title="5 years"
                    className={`inline-block h-full px-2 py-4 ${task.status.completed? "bg-green-500" : distanceCategoryToColor(task.exiprationTimestamp)} border-b-2 border-r-2 border-gray-600 text-white rounded-br-3xl items-center`}
                >
                    {distanceToNow(task.exiprationTimestamp)}
                </div>
            }
            <div className="flex-grow"></div>
            <span
                className={`${ColorThemes[task.status.access].bg} ${ColorThemes[task.status.access].text} inline-block px-2 py-1 leading-none rounded-full font-semibold uppercase tracking-wide text-xs`}
            >
                {task.status.access}
            </span>
            <div className="pt-2 px-4">
                <button
                    disabled={task.ownerID != userID}
                    name="Change completed state of task."
                    onClick={(e) => { setCompletedStatus(task) }}
                >
                    <SetStatusbtn completed={task.status.completed} />
                </button>
            </div>
        </aside >
    )
}

const distanceCategoryToColor = (dateTime: Date) => {
    switch (distanceCategory(dateTime)) {
        case 'early':
            return 'bg-green-500';
        case 'soon':
            return 'bg-yellow-400';
        case 'late':
            return 'bg-red-500';

        default:
            return 'bg-gray-400';
    }
}

export default TaskComponent;