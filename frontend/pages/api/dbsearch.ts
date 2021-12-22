import type { NextApiRequest, NextApiResponse } from 'next'
import Client_meredith from '../../lib/db/Client_meredith'

import { Task, IDlessTask } from '../../types/interfaces/Task'
import { RequestParams } from '@elastic/elasticsearch'
import { SearchResponse } from '../../types/interfaces/ElasticSearch'

const test = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    // let tasks: Task[];
    // Client_meredith.search(params).then(
    //     (result: ApiResponse) => {
    //         tasks = result.body.hits.hits;

    // let response = {
    //     greeting: "Hello :)",
    //     result: tasks[1],
    //   };
    //   res.send(JSON.stringify(response, null, 2));
    //     }
    // )

    // interface Source {
    //     foo: string
    // }
    // let result = await Client_meredith.search<Source>({
    //     index: 'task',
    //     body: {
    //         query: {
    //             match_all: {}
    //         }
    //     }
    // });
    // result.body.foo
    // res.send(JSON.stringify(result, null, 2));





    interface SearchBody extends RequestParams.Search {
        query?: {
            match: { ownerID: string }
        }
    }


    const { body, statusCode, headers, warnings, meta } = await Client_meredith.search<SearchResponse<IDlessTask>, SearchBody>({
        index: 'task',
        body: {
            query: {
                match: { ownerID: "daniel" }
            }
        }
    })
    
    //   response.statusCode
    let result: Task[] = body.hits.hits.map(hit => { return { id: hit._id, ...hit._source } })
    
    res.send(JSON.stringify(result, null, 2));
}

export default test;