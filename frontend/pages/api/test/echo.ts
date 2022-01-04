import type { NextApiRequest, NextApiResponse } from 'next'
import { IDlessTask } from '../../../types/interfaces/Task'
import postTask from '../../../lib/task/postTask'

const test = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const newTask: IDlessTask = {
        creationTimestamp: Date.now(),
        ownerID: "daniel",
        public: true,
        content: {
            headline: "headline",
            content: "Subnautica čumík 5",
        }
    }
    res.send(JSON.stringify({request: {body: req.body, query: req.query, headers: req.headers}}, null, 2));
}

export default test;