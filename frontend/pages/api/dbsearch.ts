import type { NextApiRequest, NextApiResponse } from 'next'
import Client_meredith from '../../lib/db/Client_meredith'

import { Task, IDlessTask } from '../../types/interfaces/Task'
import { RequestParams } from '@elastic/elasticsearch'
import { SearchResponse } from '../../types/interfaces/ElasticSearch'
import { Search } from '@elastic/elasticsearch/api/requestParams'

const test = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    interface SearchBody extends RequestParams.Search {
        query?: {
            match: { ownerID: string }
        }
    }

    const params: Search<SearchBody> = {
        index: "task",
        body: {
            query: {
                match: { ownerID: "Daniel" }
            }
        }
    } 

    Client_meredith.search<SearchResponse<IDlessTask>, SearchBody>(params
    ).then( ({ body, statusCode, headers, warnings, meta }) => {
        if( statusCode != 200) { throw new Error("Request to database was unsuccessful."); }
        
        let result: Task[] = body.hits.hits.map(hit => { return { id: hit._id, ...hit._source } })
        res.send(JSON.stringify(result, null, 2));

    }).catch( reason => {
        res.status(503).send(reason.toString());
    })
}

export default test;