import type { NextApiRequest, NextApiResponse } from 'next'
import { IDlessTask, NewTask } from '../../../types/interfaces/Task'
import postTask from '../../../lib/task/postTask'
import { parseTasks } from '../../../lib/task/TaskUtils'
import { getSession } from "next-auth/react"


const create = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const session = await getSession({ req });

    if (!session) {
        res.status(401).json({ message: "No session created, please login." });
        return;
    }

    let newTasks = await parseTasks(req)
        .then(result => { return result })
        .catch(_ => {
            return [];
        });

    // TODO phony handling 
    // TODO for loop post multiple tasks
    if (newTasks.length == 0) {
        res.status(400).json({message: "No valid requests."});
        return;
    }

    await Promise.all(newTasks.map((newTask: IDlessTask) => { return postTask(newTask) }))
        .then(results => {
            res.json({ results });
        })
        .catch(reason => {
            res.status(503).send(reason.toString());
        })
}



export default create;