import type { NextApiRequest, NextApiResponse } from 'next'
import Client_meredith from '../../lib/db/Client_meredith'
import { RequestParams } from '@elastic/elasticsearch'
import { IDlessTask } from '../../types/interfaces/Task'
import { IndexResponse } from '../../types/interfaces/ElasticSearch'

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
            content: "Welcome to stardewValley",
        }
    }
    const newTaskQuerry: RequestParams.Index<IDlessTask> = {
        index: 'task',
        body: newTask
    }
    
    Client_meredith.index<IndexResponse>(newTaskQuerry)
    .then(({ body, statusCode, headers, warnings, meta }) => {
        if (statusCode != 201) { throw new Error("Request to database was unsuccessful."); }
        
        res.send(JSON.stringify({ body }, null, 2));
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