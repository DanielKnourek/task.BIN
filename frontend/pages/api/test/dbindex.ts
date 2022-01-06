import type { NextApiRequest, NextApiResponse } from 'next'
import { IDlessTask } from '../../../types/interfaces/Task'
import postTask from '../../../lib/task/postTask'

const test = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const newTask: IDlessTask = {
        creationTimestamp: new Date(),
        ownerID: "daniel",
        public: "private",
        content: {
            headline: "headline",
            content: "Subnautica čumík 5",
        },
        completed: false,
    }
    postTask(newTask)
    .then(response => {
        res.send(JSON.stringify({ response }, null, 2));
    }).catch(reason => {
        res.status(503).send(reason.toString());
    })
}

export default test;

// POST /task/_doc
// {
//   "id": "123654"
// }

// {
//     "_index" : "task",
//     "_type" : "_doc",
//     "_id" : "8s4F430BjShMp9fDOIsC",
//     "_version" : 1,
//     "result" : "created",
//     "_shards" : {
//       "total" : 2,
//       "successful" : 2,
//       "failed" : 0
//     },
//     "_seq_no" : 6,
//     "_primary_term" : 1
//   }