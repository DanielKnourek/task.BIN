import { IDlessTask, NewTask, PartialTask } from '../../types/interfaces/Task'
import DOMPurify from 'isomorphic-dompurify';
import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';
import { getUserID } from '../user';

export const validateTask = async (idlessTask: NewTask): Promise<NewTask> => {
    //TODO better sanitizing solution
    try {
        let newTask: NewTask = {
            status: {
                access: (() => {
                    if (idlessTask?.status?.access == 'public') {
                        return 'public';
                    }
                    return 'private';
                })()
            },
            content: {
                headline: DOMPurify.sanitize(idlessTask?.content?.headline),
                content: DOMPurify.sanitize(idlessTask?.content?.content),
                tags: [],
            },
        };
        try {
            if (!!idlessTask.exiprationTimestamp) {
                const tmpTimestamp = new Date(idlessTask.exiprationTimestamp);
                if (tmpTimestamp instanceof Date && !isNaN(tmpTimestamp.getTime()) && tmpTimestamp.getTime() > 10) {
                    newTask.exiprationTimestamp = tmpTimestamp;
                }
            }
        } catch (error) {
            // Do nothing, 
            // newTask.exiprationTimestamp is optional.
        }

        return newTask;
    } catch (error) {
        throw error;
    }
}

export const parseTasks = async (req: NextApiRequest): Promise<IDlessTask[]> => {
    const session = await getSession({ req });
    let PreparedTasks: IDlessTask[] = new Array();

    if (!req.body.tasks) {
        return [];
    }
    try {
        for (const reqTask of req.body.tasks) {
            const reqIDlessTask = await validateTask(reqTask);


            const PreparedTask: IDlessTask = {
                ...reqIDlessTask,
                status: {
                    completed: false,
                    access: reqIDlessTask.status.access,
                },
                creationTimestamp: new Date(),
                ownerID: getUserID(session!),
            };
            PreparedTasks.push(PreparedTask);
        }

    } catch (error) {
        throw error;
    }
    return PreparedTasks;
}

export const validatePartialTask = async (req: NextApiRequest): Promise<PartialTask[]> => {

    return parseTasks(req).then(tasks => {
        let validatedTasks: PartialTask[] = new Array();
        tasks.forEach((task, index) => {
            const Requestedfields = Object.keys(req.body?.tasks[index])
            validatedTasks[index] = {};

            if ( Requestedfields.includes('status')) {
                validatedTasks[index].status = { access: task.status.access };
            }
            if ( Requestedfields.includes('content')) {
                validatedTasks[index].content = task.content;
            }
            if ( Requestedfields.includes('exiprationTimestamp')) {
                validatedTasks[index].exiprationTimestamp = task.exiprationTimestamp;
            }
        })
        return validatedTasks;
    });
}
