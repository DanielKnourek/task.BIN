import type { NextApiRequest, NextApiResponse } from 'next'
import Client_meredith from '../../lib/db/Client_meredith'

import { Task, IDlessTask } from '../../types/interfaces/Task'
import { RequestParams } from '@elastic/elasticsearch'
import { SearchResponse } from '../../types/interfaces/ElasticSearch'

const test = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    interface querryBody {
        query?: {
            match: { ownerID: string },
        },
    }
    const params: RequestParams.Search<querryBody> = {
        index: 'task',
        body: {
            query: {
                match: { ownerID: "daniel" },
            }
        }
    }

    Client_meredith.search<SearchResponse<IDlessTask>, querryBody>(params)
    .then(({ body, statusCode, headers, warnings, meta }) => {
        if (statusCode != 200) { throw new Error("Request to database was unsuccessful."); }

        let response: Task[] = body.hits.hits.map(hit => { return { id: hit._id, ...hit._source } });
        res.send(JSON.stringify(response, null, 2));

    }).catch(reason => {
        res.status(503).send(reason.toString());
    })
}

export default test;