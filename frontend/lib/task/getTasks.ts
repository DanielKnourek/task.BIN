import Client_meredith from '../../lib/db/Client_meredith'

import { Task, IDlessTask } from '../../types/interfaces/Task'
import { RequestParams } from '@elastic/elasticsearch'
import { SearchResponse } from '../../types/interfaces/ElasticSearch'

type getTasksParams = {
    querryType: 'public',
} | {
    querryType: 'private',
    ownerID: string,
}

const getTasks = async (querryParams: getTasksParams) => {

    let selectedQuerry = null;
    if (querryParams.querryType == 'public') {
        selectedQuerry = getQuerryPublic();
    }

    if (querryParams.querryType == 'private') {
        selectedQuerry = getQuerryPrivate(querryParams.ownerID);
    }

    if (!selectedQuerry) {
        throw Error("No valid request for tasks.");
    }


    return await selectedQuerry
        .then(({ body, statusCode, headers, warnings, meta }) => {
            if (statusCode != 200) { throw new Error("Request to database was unsuccessful."); }
            let response: Task[] = body.hits.hits.map(hit => { return { id: hit._id, ...hit._source } });
            return response;

        }).catch(reason => {
            throw reason;
        })

}



const getQuerryPrivate = (ownerID: string) => {
    interface querryBody {
        query?: {
            match: {
                "ownerID": string,
            },
        },
    }

    const params: RequestParams.Search<querryBody> = {
        index: 'task',
        body: {
            query: {
                match: {
                    "ownerID": ownerID,
                },
            }
        }
    }
    return Client_meredith.search<SearchResponse<IDlessTask>, querryBody>(params);
}


const getQuerryPublic = () => {
    interface querryBody {
        query?: {
            match: {
                "status.access": Task['status']['access'],
            },
        },
    }

    const params: RequestParams.Search<querryBody> = {
        index: 'task',
        body: {
            query: {
                match: {
                    "status.access": 'public'
                },
            }
        }
    }
    return Client_meredith.search<SearchResponse<IDlessTask>, querryBody>(params);
}

export default getTasks;