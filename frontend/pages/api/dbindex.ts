import type { NextApiRequest, NextApiResponse } from 'next'
import Client_meredith from '../../lib/db/Client_meredith'
import { ApiResponse, RequestParams } from '@elastic/elasticsearch'
import { IDlessTask } from '../../types/interfaces/Task'

const test = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const IDlessTask: IDlessTask = {
        creationTimestamp: Date.now(),
        ownerID: "global",
        public: true,
        content: {
            headline: "headline",
            content: "Hello world!",
        }
    }
    //   let status = await Client_meredith.cluster.health();
    const doc1: RequestParams.Index = {
        index: 'task',
        body: IDlessTask
    }
    let result = await Client_meredith.index(doc1);
    let response = {
        greeting: "Hello",
        result: result,
    };
    res.send(JSON.stringify(response, null, 2));
}

export default test;