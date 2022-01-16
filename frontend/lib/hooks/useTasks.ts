import { useState, useEffect, useRef, createContext, useContext } from 'react'
import useSWR, { useSWRConfig } from 'swr'

import { useSession } from "next-auth/react";
import apiFetch, { enableESToSync } from '../apiFetch';
import { NewTask, Task } from '../../types/interfaces/Task';
import { DialogForm } from '../../components/task/DialogForm';
import { sortTasksState } from '../store/listFilters';
import useStore from './useStore';

// type useTasksParams = {
//     taskid: 'public' | 'private',
// }

const useTasks = () => {
    const { data: session, status } = useSession();
    const { access, form } = useTasksContext();

    // TODO Mabye use userID insted private for cashing reasons
    const apiUrl = `/api/task/${access}`

    const { mutate } = useSWRConfig();

    const { data: tasks, error } = useSWR<Task[]>(
        apiUrl,
        (url: string, body: any) => {
            const res = apiFetch<Task[]>(url, body)
                .then((result) => {
                    result.forEach(task => {
                        task.creationTimestamp = new Date(task.creationTimestamp);
                        if (!!task.exiprationTimestamp) {
                            task.exiprationTimestamp = new Date(task.exiprationTimestamp);
                        }
                    })
                    return result;
                })
            return res;

        }
    );

    const setCompletedStatus = async (targetTask: Task) => {
        // update the local data immediately, but disable the revalidation
        if (!tasks) {
            return;
        }
        // tasks.find(t => t.id == targetTask.id).status.completed = false;
        const targetIndex = tasks.findIndex(t => t.id == targetTask.id)
        const updatedItem: Task = {
            ...tasks[targetIndex],
            status: {
                ...tasks[targetIndex].status,
                completed: !targetTask.status.completed
            }
        }
        mutate(apiUrl, [
            ...tasks.slice(0, targetIndex),
            updatedItem,
            ...tasks.slice(targetIndex + 1),
        ], false)

        // TODO Error handling
        try {
            await apiFetch(`/api/task/${targetTask.id}/setCompleted`, {
                tasks: [{
                    status: {
                        completed: !targetTask.status.completed
                    }
                }],
            })
            await enableESToSync(3000);
        } catch (error) {
            //Something went wrong try, again later
        }

        // trigger a revalidation (refetch) to make sure our local data is correct
        mutate(apiUrl)
    }

    const onDelete = async (targetTask: Task) => {
        if (!tasks) {
            return;
        }
        const targetIndex = tasks.findIndex(t => t.id == targetTask.id)

        mutate(apiUrl, [
            ...tasks.slice(0, targetIndex),
            ...tasks.slice(targetIndex + 1),
        ], false)

        // TODO Error handling
        try {
            await apiFetch(`/api/task/${targetTask.id}/delete`, {})
            await enableESToSync(3000);
        } catch (error) {
            //Something went wrong try, again later
        }

        // trigger a revalidation (refetch) to make sure our local data is correct
        mutate(apiUrl)
    }

    // const [isOpen, setIsOpen] = useState(false);
    // const editForm = DialogForm({isOpen, setIsOpen, message: 'Update Task'})
    // const editForm = useRef(null);

    const bringForm = (targetTask: Task) => {
        if (form.setDefaultFormValues) {
            form.setDefaultFormValues(targetTask);
            form.setIsOpen(!form.isOpen);
        }
    }

    const onUpdate = async (FormReqData: NewTask, targetID: Task['id']) => {
        const result = apiFetch(`/api/task/${targetID}/update`, {
            tasks: [FormReqData],
        })
        await enableESToSync(3000);

        // trigger a revalidation (refetch) to make sure our local data is correct
        await mutate(apiUrl)

        return result;
    }
    const onCreate = async (FormReqData: NewTask) => {
        const result = apiFetch('/api/task/create',
            {
                tasks: [FormReqData],
            })
        await enableESToSync(3000);
        await mutate(apiUrl);
        return result
    }


    // const [filterMethods, setFilterMethods] = useState<method[]>([])
    const { listFilters } = useStore();


    const sortTasks = ({ methods }: sortTasksState) => {
        let sortedTasks = tasks ? tasks : [];
        for (const method of methods) {
            switch (method) {
                case 'completed':
                    sortedTasks = sortedTasks.filter(task => task.status.completed);
                    break;
                case 'incomplete':
                    sortedTasks = sortedTasks.filter(task => !task.status.completed);
                    break;
                case 'public':
                    sortedTasks = sortedTasks.filter(task => task.status.access == 'public');
                    break;
                case 'private':
                    sortedTasks = sortedTasks.filter(task => task.status.access == 'private');
                    break;
                case 'byDateAsc':
                    sortedTasks = sortedTasks.sort((a, b) => { return a.creationTimestamp.getTime() - b.creationTimestamp.getTime() })
                    break;
                case 'byDateDesc':
                    sortedTasks = sortedTasks.sort((a, b) => { return -(a.creationTimestamp.getTime() - b.creationTimestamp.getTime()) })
                    break;

                default:
                    break;
            }
        }
        return sortedTasks;
    }

    return {
        tasks: sortTasks(listFilters),
        isLoading: !error && !tasks,
        isError: error,
        setCompletedStatus, onDelete, onUpdate, onCreate,
        bringForm, form,
    };
}



export default useTasks;

type useTasksContextOptions = {
    type: 'create' | 'edit',
    access: Task['status']['access'],
    message: {
        title: string,
        success: string,
        error: string,
    },
    form: {
        isOpen: boolean,
        setIsOpen: (c: boolean) => void,
        defaultFormValues?: Task,
        setDefaultFormValues?: (c: Task) => void,
    }
}

const useTasksContextDefaults: useTasksContextOptions = {
    type: 'create',
    access: 'public',
    message: {
        title: 'Edit Task',
        success: "Successfully edited.",
        error: "Could not edit Task.",
    },
    form: {
        isOpen: false,
        setIsOpen: () => { },
        setDefaultFormValues: () => { },
    }
}

export const TasksContext = createContext(useTasksContextDefaults);

export const useTasksContext = () => useContext(TasksContext);
