import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';

import updateTask from '../../../../lib/task/updateTask';
import { getUserID } from '../../../../lib/user';
import { Task } from '../../../../types/interfaces/Task';

const APIsetCompleted = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    let responseMessage;

    try {
        const session = await getSession({ req });
        if (!session) {
            return res.status(401).json({ message: "Not autheticated, please log in." });
        }

        const reqTask: Task = req.body.tasks[0];
        // if (req.query.taskid == 'private' || req.query.taskid == 'my' || req.query.taskid == getUserID(session)) {
        const results = await updateTask({
            querryType: 'completedStatus',
            userID: getUserID(session),
            taskID: String(req.query.taskid),
            completed: Boolean(reqTask.status.completed),
        });
        return res.json(results);
        // }

    } catch (error: any) {
        responseMessage = error?.message;
    }

    //TODO remove print error ?
    return res.status(400).json({ message: "An error has occured", error: responseMessage });
}


export default APIsetCompleted;