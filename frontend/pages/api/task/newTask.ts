import type { NextApiRequest, NextApiResponse } from 'next'
import { IDlessTask } from '../../../types/interfaces/Task'
import postTask from '../../../lib/task/postTask'

const newTask = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const newTask: IDlessTask = {
        creationTimestamp: new Date(),
        ownerID: "daniel",
        public: true,
        completed: false,
        content: {
            headline: "headline",
            content: "Subnautica čumík 5",
        }
    }
    postTask(newTask)
    .then(response => {
        res.send(JSON.stringify({ response }, null, 2));
    }).catch(reason => {
        res.status(503).send(reason.toString());
    })
}

export default newTask;