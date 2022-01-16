import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { parseTasks, validatePartialTask } from '../../../../lib/task/TaskUtils';

import updateTask from '../../../../lib/task/updateTask';
import { getUserID } from '../../../../lib/user';
import { PartialTask, Task } from '../../../../types/interfaces/Task';

const APIupdate = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    let responseMessage;

    try {
        const session = await getSession({ req });
        if (!session) {
            return res.status(401).json({ message: "Not autheticated, please log in." });
        }

        let newTasks = await validatePartialTask(req)
            .then(result => { return result })
            .catch(_ => {
                return [];
            });

        // TODO phony handling 
        // TODO for loop post multiple tasks
        if (newTasks.length == 0) {
            res.status(400).json({ message: "No valid requests." });
            return;
        }
        
        const results = await updateTask({
            querryType: 'updateFields',
            userID: getUserID(session),
            taskID: String(req.query.taskid),
            updateFields: newTasks[0],
        });
        return res.json(results);

    } catch (error: any) {
        responseMessage = error?.message;
    }

    //TODO remove print error ?
    return res.status(400).json({ message: "An error has occured", error: responseMessage });
}


export default APIupdate;